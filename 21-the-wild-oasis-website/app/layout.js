import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// Using next.js font optimization
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
   subsets: ["latin"],
   display: "swap",
});

import "@/app/_styles/globals.css";

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
            className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
         >
            <header>
               <Logo />
               <Navigation />
            </header>
            <main>{children}</main>
            <footer>Copyright by the wild oasis.</footer>
         </body>
      </html>
   );
}

export default RootLayout;
