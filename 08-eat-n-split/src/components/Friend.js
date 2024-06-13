import Button from "./Button";

export default function Friend({ friendObj, selectedFriend, onSelection }) {
  const isSelected = selectedFriend?.id === friendObj.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friendObj.image} alt={friendObj.name} />
      <h3>{friendObj.name}</h3>

      {friendObj.balance < 0 && (
        <p className="red">
          {" "}
          You owe {friendObj.name} ${Math.abs(friendObj.balance)}.
        </p>
      )}
      {friendObj.balance > 0 && (
        <p className="green">
          {" "}
          {friendObj.name} owes you ${Math.abs(friendObj.balance)}.
        </p>
      )}
      {friendObj.balance === 0 && <p>You and {friendObj.name} are even.</p>}

      <Button onClick={() => onSelection(friendObj)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
