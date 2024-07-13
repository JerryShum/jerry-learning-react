import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
   questions: [],
   // loading, error, ready, active, finished
   status: "loading",
};

function reducer(state, action) {
   switch (action.type) {
      case "dataReceived":
         return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
         return { ...state, status: "error" };
      case "start":
         return { ...state, status: "active" };
      default:
         throw new Error("Action Unknown");
   }
}

export default function App() {
   const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

   const numQuestions = questions.length;

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
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && (
               <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
            )}
            {status === "active" && <Question />}
         </Main>
      </div>
   );
}
