export default function Percentage({
  percentValue,
  setPercentValue,
  children,
}) {
  function handlePercentChange(value) {
    if (value === "5") {
      setPercentValue("5");
    } else if (value === "10") {
      setPercentValue("10");
    } else if (value === "20") {
      setPercentValue("20");
    } else if (value === "") {
      setPercentValue("0");
    }
  }

  return (
    <div>
      <div>{children}</div>
      <select
        value={percentValue}
        onChange={(e) => handlePercentChange(e.target.value)}
      >
        <option value="">{`Terrible(0%)`}</option>
        <option value="5">{`Mid (5%)`}</option>
        <option value="10">{`It was good (10%)`}</option>
        <option value="20">{`Absolutely Amazing(20%)`}</option>
      </select>
    </div>
  );
}
