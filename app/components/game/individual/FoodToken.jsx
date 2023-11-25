import { useAtom } from "jotai";
import {
  disabledStatesAtom,
  currentActionAtom,
  playerFoodSupplyAtom,
  selectedFoodAtom,
  gainResourceQuantityAtom,
  disableSelectionAtom,
} from "../../../utils/jotaiStore";
import { foodSelection } from "../../../utils/gameFunctions/birdFeederFunctions";

const FoodToken = ({ food }) => {
  //disabled states
  const [disableState] = useAtom(disabledStatesAtom);
  const disableFood = disableState.playerFood;
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  //current action
  const [currentAction] = useAtom(currentActionAtom);

  //food states
  const [playerFoodSupply, setPlayerFoodSupply] = useAtom(playerFoodSupplyAtom);
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

  //resource quantity
  const [resourceQuantity] = useAtom(gainResourceQuantityAtom);

  const testFunc = () => {
    if (disableFood) {
      console.log("Disabled");
    } else {
      if (currentAction === "playABird") {
        foodSelection(
          playerFoodSupply,
          setSelectedFood,
          setPlayerFoodSupply,
          food.id
        );

        if (selectedFood.length + 1 === resourceQuantity) {
          setDisableSelection((prev) => ({
            ...prev,
            food: false,
          }));
        } else {
          setDisableSelection((prev) => ({
            ...prev,
            food: true,
          }));
        }
      }
    }
  };

  return (
    <div className="bg-indigo-400 p-3 rounded-lg text-white" onClick={testFunc}>
      <p>{food.type}</p>
    </div>
  );
};

export default FoodToken;
