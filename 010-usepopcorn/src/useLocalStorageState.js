import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
   //* Setting the initial value of the watched state to the values stored in localStorage
   const [value, setValue] = useState(function () {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
   });

   //! Making our watched movies store into local storage
   useEffect(
      function () {
         localStorage.setItem(key, JSON.stringify(value));
      },
      [value]
   );

   return [value, setValue];
}
