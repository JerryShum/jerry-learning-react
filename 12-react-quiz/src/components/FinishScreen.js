function FinishScreen({ points, maximumPoints, highscore }) {
   const percentage = Math.round((points / maximumPoints) * 100).toFixed(1);

   let emoji;
   if (percentage >= 80) {
      emoji = "🥳";
   } else if (percentage >= 60) {
      emoji = "😊";
   } else if (percentage >= 40) {
      emoji = "😐";
   } else {
      emoji = "😢";
   }

   return (
      <>
         <p className="result">
            You scored <strong>{points}</strong> out of {maximumPoints} (
            {percentage}%) {emoji}
         </p>
         <p className="highscore">(Highscore: {highscore} Points)</p>
      </>
   );
}

export default FinishScreen;
