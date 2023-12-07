import { BirdHand, PlayerFoodSupply } from "./";
import { useAtom } from "jotai";
import { totalEggCountAtom } from "../../../utils/jotaiStore";

const PlayerSetup = () => {
  const [totalEggCount] = useAtom(totalEggCountAtom);
  return (
    <div className="flex flex-col gap-5 ">
      <BirdHand />
      <PlayerFoodSupply />
      <p className="text-xl font-bold bg-orange-500 text-white p-3 rounded-lg">
        Total Eggs on Mat: {totalEggCount}
      </p>
    </div>
  );
};

export default PlayerSetup;
