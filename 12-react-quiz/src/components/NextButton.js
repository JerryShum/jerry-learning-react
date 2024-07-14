import { type } from "@testing-library/user-event/dist/type";

function NextButton({ dispatch, answer, index, numQuestions }) {
   if (answer === null) return null;

   if (index < numQuestions - 1) {
      return (
         <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
         >
            Next Question
         </button>
      );
   } else if (index === numQuestions - 1) {
      return (
         <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finish" })}
         >
            Finish Quiz
         </button>
      );
   }
}

export default NextButton;
