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
    <div>
      <p>Player food</p>
      <div className="flex gap-3">{foodSupplyContent}</div>
    </div>
  );
};

export default PlayerFoodSupply;
