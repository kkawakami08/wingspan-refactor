import { useAtom } from "jotai";
import {
  selectedFoodAtom,
  currentActionAtom,
  disableSelectionAtom,
  playerFoodSupplyAtom,
  birdFeederAtom,
  disabledStatesAtom,
  selectedBirdsAtom,
  birdHandAtom,
} from "../../../utils/jotaiStore";
import { SelectedFoodToken } from "../individual";
import { saveSelection } from "../../../utils/gameFunctions/generalFunctions";
import { enableRolling } from "../../../utils/gameFunctions/birdFeederFunctions";
import {
  initialDisabledStates,
  initialDisableSelectionState,
} from "../../../data/initialData";

const SelectedFood = () => {
  //get states from jotai
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);
  const [birdFeeder] = useAtom(birdFeederAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(birdHandAtom);

  const [currentAction] = useAtom(currentActionAtom);
  const [disableSelection, setDisableSelection] = useAtom(disableSelectionAtom);
  const [, setDisabledStates] = useAtom(disabledStatesAtom);

  const disableFoodSelection = disableSelection.food;

  //mapping over birdhand
  const selectedFoodContent = selectedFood.map((food) => (
    <SelectedFoodToken key={food.id} food={food} />
  ));

  const buttonContent =
    currentAction === "forest" ? "save selection" : "discard selection";

  const testFunc = () => {
    console.log(selectedBirds.length);
    if (selectedBirds.length > 0) {
      setBirdHand((prev) => [...prev, ...selectedBirds]);
      setSelectedBirds([]);
    }
    saveSelection(setPlayerFood, setSelectedFood, selectedFood);

    setDisabledStates(initialDisabledStates);
    setDisableSelection(initialDisableSelectionState);
    enableRolling(birdFeeder, setDisableSelection);
  };

  return (
    <div>
      <div className="flex gap-5">
        <p>Selected Food</p>
      </div>
      <div className="flex gap-3 flex-wrap">{selectedFoodContent}</div>
      <button
        className="disabled:bg-emerald-100 bg-emerald-900 text-white p-3 rounded-lg"
        disabled={disableFoodSelection}
        onClick={testFunc}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default SelectedFood;
