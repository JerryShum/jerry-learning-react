"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";

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
}
