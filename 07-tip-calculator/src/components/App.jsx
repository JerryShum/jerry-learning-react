import Bill from "./Bill";
import Percentage from "./Percentage";
import ResetButton from "./Button";
import Output from "./Output";
import { useState } from "react";

function App() {
  const [billInput, setBillInput] = useState(null);
  const [percentValue1, setPercentValue1] = useState("");
  const [percentValue2, setPercentValue2] = useState("");

  let tipAverage = (Number(percentValue1) + Number(percentValue2)) / 200;
  const tipValue = +billInput * tipAverage;

  function handleBillChange(num) {
    setBillInput(num);
    console.log(billInput);
  }

  return (
    <div>
      <Bill billInput={billInput} handleBillChange={handleBillChange}></Bill>
      <Percentage
        percentValue={percentValue1}
        setPercentValue={setPercentValue1}
      >
        <h2>How did you like the service?</h2>
      </Percentage>
      <Percentage
        percentValue={percentValue2}
        setPercentValue={setPercentValue2}
      >
        <h2>How did your friend like the service?</h2>
      </Percentage>
      <Output billInput={billInput} tipValue={tipValue} />
      {billInput > 0 && (
        <ResetButton
          setBillInput={setBillInput}
          setPercentValue1={setPercentValue1}
          setPercentValue2={setPercentValue2}
        >
          Reset
        </ResetButton>
      )}
    </div>
  );
}

export default App;
