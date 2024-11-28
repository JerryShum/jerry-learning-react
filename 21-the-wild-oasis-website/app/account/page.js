import { auth } from "../_lib/auth";

export const metadata = {
   title: "Account",
};

async function page() {
   const session = await auth();
   const firstName = session.user.name.split(" ").at(0);

   return <div className=" text-accent-500">Welcome, {firstName}</div>;
}

export default page;
