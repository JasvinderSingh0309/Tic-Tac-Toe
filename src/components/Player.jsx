import { useState } from "react";

function Player(props) {
  let [isEditing, setIsEditing] = useState(false);
  let [player,setPlayer] = useState(props.name);

  function handleEditClick() {
    setIsEditing((lastIsEditing) => !lastIsEditing);

    if(isEditing) {
      props.onNameChange(props.symbol, player);
    }
  }

  function handleNameChange(event) {
    setPlayer(event.target.value);
  }

  let playerName = <span className="player-name">{player}</span>;
  if(isEditing) {
    playerName = <input type="text" value={player} onChange={handleNameChange}/>;
  }

  let acPlayer;
  if(props.symbol === props.currPlayer) acPlayer = "active";

  return (
    <li className={acPlayer}>
      <span className="player">
        {playerName}
        <span className="player-symbol">
          {props.symbol}
        </span>
      </span>
      <button onClick={handleEditClick}>
        {!isEditing? "Edit" : "Save"}
      </button>
    </li>
  );
}
export default Player;
