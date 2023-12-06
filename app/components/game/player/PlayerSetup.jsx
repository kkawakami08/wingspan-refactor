import { BirdHand, PlayerFoodSupply } from "./";

const PlayerSetup = () => {
  return (
    <div className="flex flex-col gap-5 ">
      <BirdHand />
      <PlayerFoodSupply />
    </div>
  );
};

export default PlayerSetup;
