import { useAtom } from "jotai";
import {
  currentActionAtom,
  selectedFoodAtom,
  birdFeederAtom,
  gainResourceQuantityAtom,
  disableSelectionAtom,
} from "../../../utils/jotaiStore";
import { foodSelection } from "../../../utils/gameFunctions/birdFeederFunctions";

const SelectedFoodToken = ({ food }) => {
  //current action
  const [currentAction] = useAtom(currentActionAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);

  const [resourceQuantity] = useAtom(gainResourceQuantityAtom);
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  const testFunc = () => {
    foodSelection(selectedFood, setBirdFeeder, setSelectedFood, food.id);
    if (selectedFood.length === resourceQuantity) {
      setDisableSelection((prev) => ({ ...prev, food: false }));
    } else {
      setDisableSelection((prev) => ({ ...prev, food: true }));
    }
  };

  return (
    <div className="bg-indigo-400 p-3 rounded-lg text-white" onClick={testFunc}>
      <p>{food.type}</p>
    </div>
  );
};

export default SelectedFoodToken;
