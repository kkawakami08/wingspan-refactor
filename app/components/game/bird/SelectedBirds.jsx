import { useAtom } from "jotai";
import {
  selectedBirdsAtom,
  currentActionAtom,
  disableSelectionAtom,
  birdDiscardAtom,
  gainResourceQuantityAtom,
  disabledStatesAtom,
  selectedFoodAtom,
  birdHandAtom,
  birdTrayAtom,
  birdDeckAtom,
  playerFoodSupplyAtom,
  birdFoodReqAtom,
} from "../../../utils/jotaiStore";
import { SelectedBirdCard } from "../individual";
import { saveSelection } from "../../../utils/gameFunctions/generalFunctions";
import {
  initialDisableSelectionState,
  initialDisabledStates,
} from "../../../data/initialData";
import { refillTray } from "../../../utils/gameFunctions/birdFunctions";
import { checkEnoughFood } from "../../../utils/gameFunctions/habitatFunctions";

const SelectedBirds = () => {
  //bird states
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [birdDeck, setBirdDeck] = useAtom(birdDeckAtom);
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);
  const [, setBirdHand] = useAtom(birdHandAtom);
  const [, setBirdDiscard] = useAtom(birdDiscardAtom);
  const [, setBirdFoodReq] = useAtom(birdFoodReqAtom);

  //food states
  const [playerFoodSupply, setPlayerFoodSupply] = useAtom(playerFoodSupplyAtom);
  const [selectedFood] = useAtom(selectedFoodAtom);

  //current active habitat
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);

  //bird card quantity
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  //disable states
  const [disableSelection, setDisableSelection] = useAtom(disableSelectionAtom);
  const disableBirdSelection = disableSelection.bird;
  const [, setDisabledStates] = useAtom(disabledStatesAtom);

  //mapping over birdhand
  const selectedBirdsContent = selectedBirds.map((bird) => (
    <SelectedBirdCard key={bird.common_name} bird={bird} />
  ));

  const buttonContent =
    currentAction === "forest" ? "discard cards" : "save selection";

  const selectedBirdClick = () => {
    if (currentAction === "forest") {
      saveSelection(setBirdDiscard, setSelectedBirds, selectedBirds);
      setResourceQuantity((prev) => (prev += 1));
      setDisableSelection((prev) => ({ ...prev, bird: true }));
      if (selectedFood.length + 1 === resourceQuantity) {
        setDisableSelection((prev) => ({ ...prev, food: false }));
      } else {
        setDisableSelection((prev) => ({ ...prev, food: true }));
      }
    } else if (currentAction === "wetland") {
      saveSelection(setBirdHand, setSelectedBirds, selectedBirds);
      refillTray(birdTray, birdDeck, setBirdDeck, setBirdTray);
      setDisabledStates(initialDisabledStates);
      setDisableSelection(initialDisableSelectionState);
      setResourceQuantity(0);
    } else if (currentAction === "playABird") {
      const birdCheck = checkEnoughFood(
        selectedBirds[0].food,
        playerFoodSupply
      );
      console.log(birdCheck);
      if (birdCheck.canPlay) {
        console.log("select food to discard");
        let currentCount = selectedBirds[0].food.length;
        if (birdCheck.double) {
          currentCount += birdCheck.tokenReplacement;
        }
        setResourceQuantity(currentCount);
        setBirdFoodReq((prev) => ({
          ...birdCheck,
        }));
        setDisableSelection((prev) => ({
          ...prev,
          bird: true,
        }));
        setDisabledStates((prev) => ({
          ...prev,
          playerFood: false,
        }));
      } else {
        console.log("can't play this bird. select a different one");
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
        onClick={selectedBirdClick}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default SelectedBirds;
