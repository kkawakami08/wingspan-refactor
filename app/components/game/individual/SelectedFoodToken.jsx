import { useAtom } from "jotai";
import {
  currentActionAtom,
  selectedFoodAtom,
  birdFeederAtom,
  gainResourceQuantityAtom,
  disableSelectionAtom,
  playerFoodSupplyAtom,
} from "../../../utils/jotaiStore";
import { foodSelection } from "../../../utils/gameFunctions/birdFeederFunctions";

const SelectedFoodToken = ({ food }) => {
  //current action
  const [currentAction] = useAtom(currentActionAtom);

  //food states
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [, setPlayerFoodSupply] = useAtom(playerFoodSupplyAtom);

  //resource quantity
  const [resourceQuantity] = useAtom(gainResourceQuantityAtom);

  //disable states
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  const selectedFoodTokenClick = () => {
    if (currentAction === "playABird") {
      foodSelection(
        selectedFood,
        setPlayerFoodSupply,
        setSelectedFood,
        food.id
      );

      if (selectedFood.length === resourceQuantity) {
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
    } else {
      foodSelection(selectedFood, setBirdFeeder, setSelectedFood, food.id);
      if (selectedFood.length === resourceQuantity) {
        setDisableSelection((prev) => ({ ...prev, food: false }));
      } else {
        setDisableSelection((prev) => ({ ...prev, food: true }));
      }
    }
  };

  return (
    <div
      className="bg-indigo-400 p-3 rounded-lg text-white"
      onClick={selectedFoodTokenClick}
    >
      <p>{food.type}</p>
    </div>
  );
};

export default SelectedFoodToken;
