export default function ResetButton({
  setBillInput,
  setPercentValue1,
  setPercentValue2,
  children,
}) {
  function handleReset() {
    setBillInput(null);
    setPercentValue1("");
    setPercentValue2("");
  }

  return (
    <button onClick={handleReset}>
      <div>{children}</div>
    </button>
  );
}
