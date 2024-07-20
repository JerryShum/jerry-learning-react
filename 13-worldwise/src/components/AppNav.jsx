import styles from "./AppNav.module.css";

function AppNav() {
   return (
      <nav className={styles.nav}>
         <ul>
            <li>
               <NavLink></NavLink>
            </li>
         </ul>
      </nav>
   );
}

export default AppNav;
