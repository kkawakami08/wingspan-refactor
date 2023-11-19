import { useAtom } from "jotai";
import {
  selectedBirdsAtom,
  currentActionAtom,
  disableSelectionAtom,
  birdDiscardAtom,
  gainResourceQuantityAtom,
  selectedFoodAtom,
} from "../../../utils/jotaiStore";
import { SelectedBirdCard } from "../individual";
import { saveSelection } from "../../../utils/gameFunctions/generalFunctions";

const SelectedBirds = () => {
  //get states from jotai
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [currentAction] = useAtom(currentActionAtom);
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );
  const [selectedFood] = useAtom(selectedFoodAtom);
  const [, setBirdDiscard] = useAtom(birdDiscardAtom);

  const [disableSelection, setDisableSelection] = useAtom(disableSelectionAtom);
  const disableBirdSelection = disableSelection.bird;

  //mapping over birdhand
  const selectedBirdsContent = selectedBirds.map((bird) => (
    <SelectedBirdCard key={bird.common_name} bird={bird} />
  ));

  const buttonContent =
    currentAction === "forest" ? "discard cards" : "save selection";

  const testFunc = () => {
    if (currentAction === "forest") {
      console.log("discarding");
      saveSelection(setBirdDiscard, setSelectedBirds, selectedBirds);
      setResourceQuantity((prev) => (prev += 1));
      setDisableSelection((prev) => ({ ...prev, bird: true }));
      if (selectedFood.length + 1 === resourceQuantity) {
        setDisableSelection((prev) => ({ ...prev, food: false }));
      } else {
        setDisableSelection((prev) => ({ ...prev, food: true }));
      }
    } else {
      console.log("Another habitat");
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        <p>Selected Birds</p>
      </div>
      <div className="flex gap-3 flex-wrap">{selectedBirdsContent}</div>
      <button
        className="disabled:bg-emerald-100 bg-emerald-900 text-white p-3 rounded-lg"
        disabled={disableBirdSelection}
        onClick={testFunc}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default SelectedBirds;
