"use client";

import { useState } from "react";

function Counter({ users }) {
   console.log(users[1]);

   const [count, setCount] = useState(0);

   return (
      <div>
         <p>There are {users.length} users</p>
         <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      </div>
   );
}

export default Counter;
