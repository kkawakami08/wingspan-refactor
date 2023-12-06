import React from "react";

const ActionSpace = ({ activeCSS, space, currentSpace }) => {
  return (
    <div className={activeCSS}>
      <p>Space {space}</p>
      <p>
        Gain {currentSpace.quantity} {currentSpace.type}
      </p>
      {currentSpace.discard !== "none" && <p>Discard {currentSpace.discard}</p>}
    </div>
  );
};

export default ActionSpace;
