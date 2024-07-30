import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
   const { isAuthenticated } = useAuth(); // Invoke the useAuth hook
   const navigate = useNavigate();

   useEffect(
      function () {
         if (!isAuthenticated) navigate("/");
      },
      [isAuthenticated, navigate]
   );

   console.log("login");

   return isAuthenticated ? children : null;
}

export default ProtectedRoute;
