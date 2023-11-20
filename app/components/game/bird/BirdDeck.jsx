import { useAtom } from "jotai";
import {
  birdDeckAtom,
  disabledStatesAtom,
  birdHandAtom,
  selectedBirdsAtom,
  gainResourceQuantityAtom,
  currentActionAtom,
  disableSelectionAtom,
} from "../../../utils/jotaiStore";
import { drawCard } from "../../../utils/gameFunctions/generalFunctions";
import {
  initialDisabledStates,
  initialDisableSelectionState,
} from "../../../data/initialData";

const BirdDeck = () => {
  const [disableState, setDisableState] = useAtom(disabledStatesAtom);
  const [, setDisableSelection] = useAtom(disableSelectionAtom);
  const disableBirdDeck = disableState.birdDeck;

  const [birdDeck, setBirdDeck] = useAtom(birdDeckAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [birdHand, setBirdHand] = useAtom(birdHandAtom);
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );
  const [currentAction] = useAtom(currentActionAtom);

  const testFunc = () => {
    if (disableBirdDeck) {
      console.log("Disabled");
    } else {
      if (currentAction === "wetland") {
        drawCard(birdDeck, setBirdHand, setBirdDeck);

        setResourceQuantity((prev) => (prev -= 1));

        if (resourceQuantity - 1 === 0) {
          console.log("No more");
          setDisableState(initialDisabledStates);
          setDisableSelection(initialDisableSelectionState);
        }
      }
    }
  };

  return (
    <div>
      <div
        className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900 w-40"
        onClick={testFunc}
      >
        <p>Bird Deck</p>
      </div>
    </div>
  );
};

export default BirdDeck;
