import Friend from "./Friend";

export default function FriendsList({ friends, selectedFriend, onSelection }) {
  const friendsArray = friends;

  return (
    <ul>
      {friendsArray.map((friendObj) => (
        <Friend
          friendObj={friendObj}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
          key={friendObj.id}
        ></Friend>
      ))}
    </ul>
  );
}
