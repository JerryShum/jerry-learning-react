import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
   questions: [],
   // loading, error, ready, active, finished
   status: "loading",
   index: 0,
   answer: null,
   points: 0,
   highscore: 0,
};

function reducer(state, action) {
   switch (action.type) {
      case "dataReceived":
         return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
         return { ...state, status: "error" };
      case "start":
         return { ...state, status: "active" };
      case "newAnswer":
         const currentQuestion = state.questions.at(state.index);

         return {
            ...state,
            answer: action.payload,
            points:
               action.payload === currentQuestion.correctOption
                  ? state.points + currentQuestion.points
                  : state.points,
         };
      case "nextQuestion":
         return { ...state, index: state.index + 1, answer: null };
      case "finish":
         state.highscore = Math.max(state.points, state.highscore);
         return { ...state, status: "finished" };
      default:
         throw new Error("Action Unknown");
   }
}

export default function App() {
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

   const [{ questions, status, index, answer, points, highscore }, dispatch] =
      useReducer(reducer, initialState);

   const numQuestions = questions.length;

   const maximumPoints = questions.reduce(
      (total, element) => total + element.points,
      0
   );

   return (
      <div className="app">
         <Header />
         <Main>
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && (
               <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
            )}
            {status === "active" && (
               <>
                  <Progress
                     index={index}
                     numQuestions={numQuestions}
                     points={points}
                     maxPoints={maximumPoints}
                     answer={answer}
                  />
                  <Question
                     question={questions[index]}
                     dispatch={dispatch}
                     answer={answer}
                  />
                  <NextButton
                     dispatch={dispatch}
                     answer={answer}
                     index={index}
                     numQuestions={numQuestions}
                  />
               </>
            )}
            {status === "finished" && (
               <FinishScreen
                  points={points}
                  maximumPoints={maximumPoints}
                  highscore={highscore}
               />
            )}
         </Main>
      </div>
   );
}
