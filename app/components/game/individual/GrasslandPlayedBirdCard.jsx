import { useAtom } from "jotai";
import {
  currentActionAtom,
  disableSelectionAtom,
  disabledStatesAtom,
  grasslandAtom,
  gainResourceQuantityAtom,
} from "../../../utils/jotaiStore";
import {
  layEgg,
  resetGrassland,
  removeEgg,
} from "../../../utils/gameFunctions/eggFunctions";

const GrasslandPlayedBirdCard = ({ space }) => {
  //disable states
  const [disableSelection, setDisableSelection] = useAtom(disableSelectionAtom);
  const [disabledStates, setDisabledStates] = useAtom(disabledStatesAtom);
  const disablePlayedBird = disabledStates.playedBird;

  //grassland states
  const [grassland, setGrassland] = useAtom(grasslandAtom);
  const currentSpace = grassland[space];

  //current action
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);

  //resource quantity
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  //initial eggs on this bird for if want to reset
  const eggCount = currentSpace.eggCount;

  //for resetting
  const resetGrasslandObj = {
    setCurrentAction,
    setDisabledStates,
    setDisableSelection,
    setResourceQuantity,
  };

  //food reqs
  const foodReqContent = currentSpace.bird.food.map((food, index) => (
    <p key={index} className="bg-cyan-900 text-white p-2 rounded-lg">
      {food}
    </p>
  ));

  const playedBirdCardClick = () => {
    if (disablePlayedBird) {
      console.log("Disabled");
    } else {
      if (currentAction === "grassland") {
        if (currentSpace.eggCount >= currentSpace.bird.egg_limit) {
          console.log("Can't place more eggs on this bird");
          //logic to check if can place eggs on other birds, if not, discards extra eggs
        } else {
          console.log("placed egg");
          //update state in grassland for bird egg count
          layEgg(setGrassland, space, setResourceQuantity);

          if (resourceQuantity === 1) {
            console.log("No more eggs to place");
            resetGrassland(resetGrasslandObj);
          }
        }
      } else if (currentAction === "wetland") {
        //if eggcount = 0 can't discard egg
        if (currentSpace.eggCount === 0) {
          console.log("no eggs to discard");
        } else {
          console.log("removed egg from bird");
          removeEgg(setGrassland, space, setResourceQuantity);
          setDisabledStates((prev) => ({
            ...prev,
            playedBird: true,
          }));
        }
      }
    }
  };

  return (
    <div
      className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900 text-center flex flex-col gap-2"
      onClick={playedBirdCardClick}
    >
      <p className="bg-emerald-900 text-white text-center p-3 text-sm rounded-lg">
        Eggs on this bird: {eggCount}
      </p>
      <p className=" text-lg">{currentSpace.bird.common_name}</p>
      <div className="flex gap-3">{foodReqContent}</div>
      <p>Egg Limit: {currentSpace.bird.egg_limit}</p>
    </div>
  );
};

export default GrasslandPlayedBirdCard;
