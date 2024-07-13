import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
   question: [],
   // loading, error, ready, active, finished
   status: "loading",
};

function reducer(state, action) {
   switch (action.type) {
      case "dataReceived":
         return { ...state, question: action.payload, status: "ready" };
      case "dataFailed":
         return { ...state, status: "error" };
      default:
         throw new Error("Action Unknown");
   }
}

export default function App() {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(function () {
      async function fetchData() {
         try {
            const response = await fetch("http://localhost:9000/questions");

            if (!response.ok) {
               const errorMessage = `An error has occured: ${response.status}`;
               throw new Error(errorMessage);
            }

            const quizQuestions = await response.json();
            dispatch({ type: "dataReceived", payload: quizQuestions });
         } catch (error) {
            dispatch({ type: "dataFailed" });
            console.log(error);
         }
      }

      fetchData();
   }, []);

   return (
      <div className="app">
         <Header />
         <Main>
            <p>1/15</p>
            <p>Question?</p>
         </Main>
      </div>
   );
}
