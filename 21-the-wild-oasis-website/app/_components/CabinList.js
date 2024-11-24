import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList() {
   // No store makes the data request NOT CACHED -> meaning the server doesn't store the result of the data fetched for this component
   noStore();

   // CHANGE
   console.log("fetching cabins");
   const cabins = await getCabins();
   console.log(cabins);

   if (!cabins.length) return null;

   return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
         {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
         ))}
      </div>
   );
}

export default CabinList;
