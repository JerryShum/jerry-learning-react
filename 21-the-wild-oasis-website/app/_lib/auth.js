import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
   providers: [
      Google({
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
   ],
   callbacks: {
      authorized({ auth, request }) {
         return !!auth?.user;
      },

      // during signin, the session hasn't been created yet.
      async signIn({ user, account, profile }) {
         try {
            const existingGuest = await getGuest(user.email);

            if (!existingGuest) {
               await createGuest({ email: user.email, fullName: user.name });
            }

            return true;
         } catch {
            return false;
         }
      },

      // Session rusn after the sign in and after the session is checkout/used (whenever auth is called)
      async session({ session, user }) {
         const guest = await getGuest(session.user.email);

         // Adding the guest ID to the session object
         session.user.guestID = guest.id;
         return session;
      },
   },
   pages: {
      signIn: "/login",
   },
};

export const {
   auth,
   signIn,
   signOut,
   handlers: { GET, POST },
} = NextAuth(authConfig);
