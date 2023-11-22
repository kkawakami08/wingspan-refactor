import { useAtom } from "jotai";
import {
  disabledStatesAtom,
  currentActionAtom,
  playerFoodSupplyAtom,
  birdFoodReqAtom,
  selectedFoodAtom,
  gainResourceQuantityAtom,
  disableSelectionAtom,
  selectedBirdsAtom,
} from "../../../utils/jotaiStore";
import { foodSelection } from "../../../utils/gameFunctions/birdFeederFunctions";

const FoodToken = ({ food }) => {
  const [disableState] = useAtom(disabledStatesAtom);
  const disableFood = disableState.playerFood;
  const [currentAction] = useAtom(currentActionAtom);
  const [playerFoodSupply, setPlayerFoodSupply] = useAtom(playerFoodSupplyAtom);
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [birdFoodReq, setBirdFoodReq] = useAtom(birdFoodReqAtom);
  const [resourceQuantity] = useAtom(gainResourceQuantityAtom);
  const [, setDisableSelection] = useAtom(disableSelectionAtom);
  // console.log(birdFoodReq);

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
