import Link from "next/link";
import Navigation from "./components/navigation";

export default function Page() {
   return (
      <div>
         <h1>The Wild Oasis. Welcome to Paradise.</h1>

         <Link href="/cabins">Explore luxury cabins</Link>
      </div>
   );
}
