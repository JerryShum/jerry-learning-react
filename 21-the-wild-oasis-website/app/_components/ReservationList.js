"use client";

import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
   // bookings we pass in as the initial state
   // we pass in the updating function
   // ---
   // we get an optimisticState that is going to be returned at the beginning
   // we get a setter function to determine the optimistic state
   const [optimisticBookings, optimisticDelete] = useOptimistic(
      bookings,
      (currentBookings, bookingID) => {
         // only return bookings that DONOT match the specified bookingID
         return currentBookings.filter((booking) => booking.id !== bookingID);
      }
   );

   async function handleDelete(bookingID) {
      optimisticDelete(bookingID);
      await deleteReservation(bookingID);
   }

   return (
      <ul className="space-y-6">
         {optimisticBookings.map((booking) => (
            <ReservationCard
               booking={booking}
               key={booking.id}
               onDelete={handleDelete}
            />
         ))}
      </ul>
   );
}

export default ReservationList;
