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
  birdFoodReqAtom,
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
  const [, setForest] = useAtom(forestAtom);
  const [forestBirdCount, setForestBirdCount] = useAtom(forestBirdCountAtom);
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);
  const [birdFeeder] = useAtom(birdFeederAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(birdHandAtom);
  const [, setResourceQuantity] = useAtom(gainResourceQuantityAtom);
  const [birdFoodReq, setBirdFoodReq] = useAtom(birdFoodReqAtom);

  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
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
        console.log(`bird uses ${birdFoodReq.wild} tokens`);
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
        setSelectedFood([]);
        setForest((prev) => ({
          ...prev,
          [forestBirdCount]: {
            ...prev[forestBirdCount],
            bird: selectedBirds[0],
          },
        }));
        setForestBirdCount((prev) => (prev += 1));
        setSelectedBirds([]);
        setDisableSelection(initialDisableSelectionState);
        setDisabledStates(initialDisabledStates);
        setCurrentAction("");
        setResourceQuantity(0);
        setBirdFoodReq({});
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
        onClick={testFunc}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default SelectedFood;
