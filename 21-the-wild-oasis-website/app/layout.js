import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// Using next.js font optimization
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
   subsets: ["latin"],
   display: "swap",
});

import { ReservationProvider } from "@/app/_components/ReservationContext";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";

export const metadata = {
   // title: "The Wild Oasis",
   title: {
      template: "%s | The Wild Oasis",
      default: "Welcome | The Wild Oasis",
   },
   description:
      "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

function RootLayout({ children }) {
   return (
      <html lang="en">
         <body
            className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
         >
            <Header>
               <Logo />
               <Navigation />
            </Header>
            <div className="flex-1 px-8 py-12 grid">
               <main className="max-w-7xl mx-auto w-full">
                  <ReservationProvider>{children}</ReservationProvider>
               </main>
            </div>
         </body>
      </html>
   );
}

export default RootLayout;
