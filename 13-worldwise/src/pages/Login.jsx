import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
   // PRE-FILL FOR DEV PURPOSE
   const [email, setEmail] = useState("jack@example.com");
   const [password, setPassword] = useState("qwerty");
   const { isAuthenticated, login } = useAuth();
   const navigate = useNavigate();

   function handleSubmit(e) {
      e.preventDefault();

      if (email && password) {
         login(email, password);
      }
   }

   useEffect(
      function () {
         if (isAuthenticated) {
            navigate("/app", { replace: true });
         }
      },
      [isAuthenticated, navigate]
   );

   return (
      <main className={styles.login}>
         <PageNav />
         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
               <label htmlFor="email">Email address</label>
               <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
               />
            </div>

            <div className={styles.row}>
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
               />
            </div>

            <div>
               <Button type="primary">login</Button>
            </div>
         </form>
      </main>
   );
}
