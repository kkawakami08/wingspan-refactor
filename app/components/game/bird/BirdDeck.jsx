import { useAtom } from "jotai";
import {
  birdDeckAtom,
  disabledStatesAtom,
  birdHandAtom,
  selectedBirdsAtom,
  gainResourceQuantityAtom,
  currentActionAtom,
  disableSelectionAtom,
  birdTrayAtom,
} from "../../../utils/jotaiStore";
import { drawCard } from "../../../utils/gameFunctions/generalFunctions";
import {
  initialDisabledStates,
  initialDisableSelectionState,
} from "../../../data/initialData";

const BirdDeck = () => {
  //disable states
  const [disableState, setDisableState] = useAtom(disabledStatesAtom);
  const [, setDisableSelection] = useAtom(disableSelectionAtom);
  const disableBirdDeck = disableState.birdDeck;

  //bird states
  const [birdDeck, setBirdDeck] = useAtom(birdDeckAtom);
  const [, setBirdTray] = useAtom(birdTrayAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(birdHandAtom);

  //draw bird card count
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  //current active habitat
  const [currentAction] = useAtom(currentActionAtom);

  const birdDeckClick = () => {
    if (disableBirdDeck) {
      console.log("Disabled");
    } else {
      if (currentAction === "wetland") {
        drawCard(birdDeck, setBirdHand, setBirdDeck);

        setResourceQuantity((prev) => prev - 1);
        console.log(
          "selected bird length",
          selectedBirds.length,
          "and resource quantity",
          resourceQuantity - 1
        );
        if (resourceQuantity - 1 !== selectedBirds.length) {
          setDisableSelection((prev) => ({
            ...prev,
            bird: true,
          }));
        }

        if (resourceQuantity - 1 === 0) {
          console.log("No more");
          if (selectedBirds.length > 0) {
            setBirdTray((prev) => [...prev, ...selectedBirds]);
            setSelectedBirds([]);
          }
          setDisableState(initialDisabledStates);
          setDisableSelection(initialDisableSelectionState);
        }
      }
    }
  };

  return (
    <div>
      <div
        className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900 w-56 h-72"
        onClick={birdDeckClick}
      >
        <p>Bird Deck</p>
      </div>
    </div>
  );
};

export default BirdDeck;
