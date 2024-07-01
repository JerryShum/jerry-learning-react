import { act, useEffect } from "react";

export function useKey(keyPressed, action) {
   useEffect(
      function () {
         function callBack(e) {
            if (e.code.toLowerCase() === keyPressed.toLowerCase()) {
               action();
               console.log("CLosing ");
            }
         }

         document.addEventListener("keydown", callBack);

         return function () {
            document.removeEventListener("keydown", callBack);
         };
      },
      [action, keyPressed]
   );
}
