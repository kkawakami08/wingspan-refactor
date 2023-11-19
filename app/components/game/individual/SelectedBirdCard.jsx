import { useAtom } from "jotai";
import {
  birdHandAtom,
  currentActionAtom,
  disabledStatesAtom,
  selectedBirdsAtom,
  disableSelectionAtom,
} from "../../../utils/jotaiStore";
import { cardSelection } from "../../../utils/gameFunctions/birdFunctions";

const SelectedBirdCard = ({ bird }) => {
  const [disableState] = useAtom(disabledStatesAtom);
  const disableBirdCard = disableState.birdHand;
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  //bird card states
  const [, setBirdHand] = useAtom(birdHandAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);

  //current action
  const [currentAction] = useAtom(currentActionAtom);

  const testFunc = () => {
    if (disableBirdCard) {
      console.log("Disabled");
    } else {
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
      } else {
        console.log("Cannot select birds");
      }
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
