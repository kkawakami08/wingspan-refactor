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
  gainResourceQuantityAtom,
  forestAtom,
  forestBirdCountAtom,
  grasslandAtom,
  grasslandBirdCountAtom,
  wetlandAtom,
  wetlandBirdCountAtom,
  birdFoodReqAtom,
  selectedHabitatAtom,
} from "../../../utils/jotaiStore";
import { SelectedFoodToken } from "../individual";
import {
  saveSelection,
  resetStates,
} from "../../../utils/gameFunctions/generalFunctions";
import { enableRolling } from "../../../utils/gameFunctions/birdFeederFunctions";
import {
  initialDisabledStates,
  initialDisableSelectionState,
} from "../../../data/initialData";
import {
  updateHabitat,
  playBird,
} from "../../../utils/gameFunctions/habitatFunctions";

const SelectedFood = () => {
  //habitat states
  const [, setForest] = useAtom(forestAtom);
  const [forestBirdCount, setForestBirdCount] = useAtom(forestBirdCountAtom);
  const [, setGrassland] = useAtom(grasslandAtom);
  const [grasslandBirdCount, setGrasslandBirdCount] = useAtom(
    grasslandBirdCountAtom
  );
  const [, setWetland] = useAtom(wetlandAtom);
  const [wetlandBirdCount, setWetlandBirdCount] = useAtom(wetlandBirdCountAtom);

  const forestHabitat = {
    setHabitat: setForest,
    habitatBirdCount: forestBirdCount,
    setHabitatBirdCount: setForestBirdCount,
  };
  const grasslandHabitat = {
    setHabitat: setGrassland,
    habitatBirdCount: grasslandBirdCount,
    setHabitatBirdCount: setGrasslandBirdCount,
  };
  const wetlandHabitat = {
    setHabitat: setWetland,
    habitatBirdCount: wetlandBirdCount,
    setHabitatBirdCount: setWetlandBirdCount,
  };

  //where bird will be played to
  const [selectedHabitat, setSelectedHabitat] = useAtom(selectedHabitatAtom);

  //food states
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);
  const [birdFeeder] = useAtom(birdFeederAtom);

  //bird states
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(birdHandAtom);

  //gain # resources
  const [, setResourceQuantity] = useAtom(gainResourceQuantityAtom);

  //for play a bird action
  const [birdFoodReq, setBirdFoodReq] = useAtom(birdFoodReqAtom);

  //current action
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);

  //disable states
  const [disableSelection, setDisableSelection] = useAtom(disableSelectionAtom);
  const [, setDisabledStates] = useAtom(disabledStatesAtom);

  const disableFoodSelection = disableSelection.food;

  const resetStatesObj = {
    setSelectedBirds,
    setSelectedFood,
    setDisableSelection,
    setDisabledStates,
    setCurrentAction,
    setResourceQuantity,
    setBirdFoodReq,
    setSelectedHabitat,
  };

  //mapping over birdhand
  const selectedFoodContent = selectedFood.map((food) => (
    <SelectedFoodToken key={food.id} food={food} />
  ));

  const buttonContent =
    currentAction === "forest" ? "save selection" : "discard selection";

  const selectFoodClick = () => {
    if (currentAction === "playABird") {
      const canPlayBird = playBird(selectedFood, selectedBirds[0], birdFoodReq);

      if (canPlayBird) {
        switch (selectedHabitat) {
          case "forest":
            console.log("adding bird to forest");
            updateHabitat(forestHabitat, selectedBirds[0]);
            resetStates(resetStatesObj);
            break;
          case "grassland":
            console.log("adding bird to grassland");
            updateHabitat(grasslandHabitat, selectedBirds[0]);
            resetStates(resetStatesObj);
            break;
          case "wetland":
            console.log("adding bird to wetland");
            updateHabitat(wetlandHabitat, selectedBirds[0]);
            resetStates(resetStatesObj);
            break;
        }
      } else {
        console.log("Not enough tokens");
      }
    } else {
      if (selectedBirds.length > 0) {
        setBirdHand((prev) => [...prev, ...selectedBirds]);
        setSelectedBirds([]);
      }
      saveSelection(setPlayerFood, setSelectedFood, selectedFood);

      setDisabledStates(initialDisabledStates);
      setDisableSelection(initialDisableSelectionState);
      setResourceQuantity(0);
      enableRolling(birdFeeder, setDisableSelection);
    }
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
        onClick={selectFoodClick}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default SelectedFood;
