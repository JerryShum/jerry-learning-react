import UpdateBookingButton from "@/app/_components/UpdateBookingButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
   const bookingID = params.bookingID;
   const booking = await getBooking(bookingID);
   const cabin = await getCabin(booking.cabinID);
   console.log(booking);
   console.log(cabin);

   // CHANGE
   const maxCapacity = cabin.maxCapacity;

   return (
      <div>
         <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Edit Reservation #{bookingID} for Cabin {cabin.name}
         </h2>

         <form
            className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
            action={updateBooking}
         >
            <div className="space-y-2">
               <label htmlFor="numGuests">How many guests?</label>
               <select
                  name="numGuests"
                  id="numGuests"
                  className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                  required
                  defaultValue={booking.numGuests}
               >
                  <option value="" key="">
                     Select number of guests...
                  </option>
                  {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
                     (x) => (
                        <option value={x} key={x}>
                           {x} {x === 1 ? "guest" : "guests"}
                        </option>
                     )
                  )}
               </select>
            </div>

            <div className="space-y-2">
               <label htmlFor="observations">
                  Anything we should know about your stay?
               </label>
               <textarea
                  name="observations"
                  className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                  defaultValue={booking.observations}
               />
            </div>

            <div className="flex justify-end items-center gap-6">
               <UpdateBookingButton />
            </div>

            <input value={bookingID} type="hidden" name="bookingID"></input>
         </form>
      </div>
   );
}
