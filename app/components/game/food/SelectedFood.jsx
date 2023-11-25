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
import { updateHabitat } from "../../../utils/gameFunctions/habitatFunctions";

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
      let foodCount = [];
      let neededTokens = 0;
      for (const { type } of selectedFood) {
        foodCount.push(type);
      }
      console.log("foodCount", foodCount);
      console.log("birdReq", selectedBirds[0].food);
      for (let i = 0; i < selectedBirds[0].food.length; i++) {
        let currentItem = selectedBirds[0].food[i];
        if (currentItem === "wild") continue;
        const index = foodCount.indexOf(currentItem);
        console.log(index);
        if (index >= 0) {
          foodCount.splice(index, 1);
        } else {
          console.log(`no ${currentItem} found`);
          neededTokens++;
        }
        console.log("foodCount updated", foodCount);
      }
      let continueAction = false;
      console.log(birdFoodReq);
      if (birdFoodReq.wild) {
        console.log(`bird uses ${birdFoodReq.wild} wild tokens`);
        if (foodCount.length === birdFoodReq.wild) {
          console.log("you have enough tokens. placed bird");
          continueAction = true;
        }
      } else {
        console.log(
          `missing ${neededTokens} more tokens for bird. so ${
            neededTokens * 2
          } total`
        );
        if (foodCount.length === neededTokens * 2) {
          console.log("enough tokens to play bird");
          continueAction = true;
        }
      }

      if (continueAction) {
        switch (selectedHabitat) {
          case "forest":
            updateHabitat(forestHabitat, selectedBirds[0]);
            resetStates(resetStatesObj);
            break;
          case "grassland":
            updateHabitat(grasslandHabitat);
            resetStates(resetStatesObj);
            break;
          case "wetland":
            updateHabitat(wetlandHabitat);
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
