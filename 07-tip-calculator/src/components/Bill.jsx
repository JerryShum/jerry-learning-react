import { useState } from "react";

export default function Bill({ billInput, handleBillChange }) {
  return (
    <div>
      <h2>How much was the bill?</h2>
      <input
        value={billInput || ""}
        onChange={(e) => handleBillChange(e.target.value)}
      />
    </div>
  );
}
