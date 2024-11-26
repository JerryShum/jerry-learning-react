import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
   // Auth makes it so that the component is dynamic -> since navigation is on every route -> every route is dynamic?
   const session = await auth();
   console.log(session);

   return (
      <nav className="z-10 text-xl">
         <ul className="flex gap-16 items-center">
            <li>
               <Link
                  href="/cabins"
                  className="hover:text-accent-400 transition-colors"
               >
                  Cabins
               </Link>
            </li>
            <li>
               <Link
                  href="/about"
                  className="hover:text-accent-400 transition-colors"
               >
                  About
               </Link>
            </li>
            <li>
               {session?.user?.image ? (
                  <Link
                     href="/account"
                     className="hover:text-accent-400 transition-colors flex items-center gap-4"
                  >
                     <div className="h-8 w-8 relative rounded-full overflow-hidden">
                        <Image
                           src={session.user.image}
                           className="rounded-full object-cover"
                           fill
                           alt={session.user.name}
                           referrerPolicy="no-referrer"
                        />
                     </div>
                     <span>Guest area</span>
                  </Link>
               ) : (
                  <Link
                     href="/account"
                     className="hover:text-accent-400 transition-colors"
                  >
                     <span>Guest area</span>
                  </Link>
               )}
            </li>
         </ul>
      </nav>
   );
}
