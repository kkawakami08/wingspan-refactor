import { useAtom } from "jotai";
import {
  playerFoodSupplyAtom,
  selectedFoodAtom,
} from "../../../utils/jotaiStore";
import { FoodToken } from "../individual";

const PlayerFoodSupply = () => {
  const [foodSupply, setFoodSupply] = useAtom(playerFoodSupplyAtom);

  const foodSupplyContent = foodSupply.map((food) => (
    <FoodToken key={food.id} food={food} />
  ));

  return (
    <div className="flex flex-col gap-5">
      <p>Player food</p>
      <div className="flex gap-3">{foodSupplyContent}</div>
    </div>
  );
};

export default PlayerFoodSupply;
