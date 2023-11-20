import { useAtom } from "jotai";
import {
  birdHandAtom,
  currentActionAtom,
  birdTrayAtom,
  selectedBirdsAtom,
  disableSelectionAtom,
  gainResourceQuantityAtom,
} from "../../../utils/jotaiStore";
import { cardSelection } from "../../../utils/gameFunctions/birdFunctions";

const SelectedBirdCard = ({ bird }) => {
  const [disableSelection, setDisableSelection] = useAtom(disableSelectionAtom);
  const disableBirdSelectionCard = disableSelection.bird;

  //bird card states
  const [, setBirdHand] = useAtom(birdHandAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdTray] = useAtom(birdTrayAtom);

  //current action
  const [currentAction] = useAtom(currentActionAtom);
  const [resourceQuantity] = useAtom(gainResourceQuantityAtom);

  const testFunc = () => {
    if (currentAction === "forest") {
      cardSelection(
        selectedBirds,
        "common_name",
        bird.common_name,
        setBirdHand,
        setSelectedBirds
      );

      if (selectedBirds.length === 1) {
        setDisableSelection((prev) => ({ ...prev, bird: false }));
      } else {
        setDisableSelection((prev) => ({ ...prev, bird: true }));
      }
    } else if (currentAction === "wetland") {
      cardSelection(
        selectedBirds,
        "common_name",
        bird.common_name,
        setBirdTray,
        setSelectedBirds
      );
      console.log(resourceQuantity, "resource quantity");
      if (selectedBirds.length === resourceQuantity) {
        setDisableSelection((prev) => ({ ...prev, bird: false }));
      } else {
        setDisableSelection((prev) => ({ ...prev, bird: true }));
      }
    } else {
      console.log("Cannot select birds");
    }
  };

  return (
    <div
      className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900"
      onClick={testFunc}
    >
      <p>{bird.common_name}</p>
    </div>
  );
};

export default SelectedBirdCard;
