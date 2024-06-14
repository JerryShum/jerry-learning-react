export default function Item({ packingItem, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={packingItem.packed}
        onChange={() => onToggleItem(packingItem.id)}
      />
      <span
        // conditional stlying --> if packed, then give style object of striked through, if not -- give empty object
        style={packingItem.packed ? { textDecoration: "line-through" } : {}}
      >
        {packingItem.quantity} {packingItem.description}
      </span>
      <button onClick={() => onDeleteItem(packingItem.id)}>❌</button>
    </li>
  );
}
