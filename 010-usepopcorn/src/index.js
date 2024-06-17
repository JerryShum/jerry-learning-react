import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./components/StarRating";

// function Test() {
//    const [movieRating, setMovieRating] = useState();

//    return (
//       <div>
//          <StarRating color="blue" onSetRating={setMovieRating} />
//          <p>This movie was rated {movieRating} stars.</p>
//       </div>
//    );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
