export default function Output({ billInput, tipValue }) {
  return (
    <div>
      <h2>
        You pay ${+billInput + tipValue} {`($${+billInput} + $${tipValue} tip)`}
      </h2>
    </div>
  );
}
