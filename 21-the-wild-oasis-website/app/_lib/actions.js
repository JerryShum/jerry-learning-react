"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
   await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
   await signOut({ redirectTo: "/" });
}

//! For updating user profile in profile page
export async function updateGuest(formData) {
   //! 1. Always authenticate and Authorize
   const session = await auth();

   // if theres a session that means that someone is logged in
   // only someone who's logged in should be able to use this action
   if (!session) throw new Error("You must be logged in.");

   const nationalID = formData.get("nationalID");
   const [nationality, countryFlag] = formData.get("nationality").split("%");

   const nationalIDRegex = /^[A-Za-z0-9]{6,12}$/; // Adjust the regex as needed
   if (!nationalIDRegex.test(nationalID)) {
      throw new Error("Please provide a valid nationalID");
   }

   const updateData = { nationality, countryFlag, nationalID };
   console.log(updateData);

   const { data, error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", session.user.guestID);

   if (error) {
      console.error(error);
      throw new Error("Guest could not be updated");
   }

   revalidatePath("/account/profile");
}

export async function deleteReservation(bookingID) {
   const session = await auth();

   if (!session) throw new Error("You must be logged in");

   const guestBookings = await getBookings(session.user.guestID);
   // get all the ID values from the bookings
   const guestBookingIDs = guestBookings.map((booking) => booking.id);

   if (!guestBookingIDs.includes(bookingID))
      throw new Error("You are not allowed to delete this booking. ");

   // Delete the booking with that specific ID
   const { data, error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingID);

   if (error) {
      console.error(error);
      throw new Error("Booking could not be deleted");
   }

   revalidatePath("/account/reservation");
}

export async function updateBooking(formData) {
   // Checking if user is logged in
   const session = await auth();
   if (!session) throw new Error("You must be logged in.");

   // Get logged in user's bookings
   const userBookings = await getBookings(session.user.guestID);
   const userBookingsIDs = userBookings.map((booking) => booking.id);

   const numGuests = formData.get("numGuests");
   const observations = formData.get("observations");
   const bookingID = formData.get("bookingID");
   const updateData = { numGuests, observations };

   // Check if currently logged in user's bookings includes currently editing booking's ID
   if (!userBookingsIDs.includes(bookingID))
      throw new Error("You are not allowed to edit this booking.");

   const { error } = await supabase
      .from("bookings")
      .update(updateData)
      .eq("id", bookingID)
      .select()
      .single();

   if (error) {
      console.error(error);
      throw new Error("Booking could not be updated");
   }

   revalidatePath("/account/reservation/edit");
}

export async function createReservation(bookingData, formdata) {
   // Checking if user is logged in
   const session = await auth();
   if (!session) throw new Error("You must be logged in.");

   const newBooking = {
      ...bookingData,
      guestID: session.user.guestID,
      numGuests: Number(formdata.get("numGuests")),
      observations: formdata.get("observations").slice(0, 1000),
      totalPrice: bookingData.cabinPrice,
      isPaid: false,
      hasBreakfast: false,
      status: "unconfirmed",
   };

   const { error } = await supabase.from("bookings").insert([newBooking]);
   if (error) throw new Error("There was an error inserting a booking.");

   revalidatePath(`/cabins/${bookingData.cabinID}`);
   redirect("/cabins/thankyou");
}
