import { createContext, useContext, useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 60;

const QuizContext = createContext();
const initialState = {
   questions: [],
   status: "loading",
   index: 0,
   answer: null,
   points: 0,
   highscore: 0,
   secondsRemaining: null,
};

function reducer(state, action) {
   switch (action.type) {
      case "dataReceived":
         return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
         return { ...state, status: "error" };
      case "start":
         return {
            ...state,
            status: "active",
            secondsRemaining: state.questions.length * SECS_PER_QUESTION,
         };
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
      case "restart":
         return {
            ...initialState,
            questions: state.questions,
            status: "ready",
            highscore: state.highscore,
            secondsRemaining: 10,
         };
      case "tick":
         return {
            ...state,
            secondsRemaining: state.secondsRemaining - 1,
            status: state.secondsRemaining === 0 ? "finished" : state.status,
         };
      default:
         throw new Error("Action Unknown");
   }
}

function QuizProvider({ children }) {
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

   const [
      { questions, status, index, answer, points, highscore, secondsRemaining },
      dispatch,
   ] = useReducer(reducer, initialState);

   console.log(questions);

   const numQuestions = questions.length;

   const maximumPoints = questions.reduce(
      (accumulator, currentValue) => accumulator + currentValue.points,
      0
   );

   console.log(maximumPoints);

   return (
      <QuizContext.Provider
         value={{
            questions,
            numQuestions,
            maximumPoints,
            status,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
            dispatch,
         }}
      >
         {children}
      </QuizContext.Provider>
   );
}

function useQuiz() {
   const context = useContext(QuizContext);
   if (context === undefined) {
      throw new Error(
         "Someone has used the QuizContext outside of the specified components."
      );
   }
   return context;
}

export { QuizProvider, useQuiz };
