import React from "react";

const BirdTrayCard = ({ bird }) => {
  return (
    <div className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900">
      <p>{bird.common_name}</p>
    </div>
  );
};

export default BirdTrayCard;
