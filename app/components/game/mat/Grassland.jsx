import { useAtom } from "jotai";
import { GrasslandActionSpace } from "../individual/";
import {
  currentActionAtom,
  grasslandAtom,
  disabledStatesAtom,
  selectedHabitatAtom,
  grasslandBirdCountAtom,
  wetlandBirdCountAtom,
  forestBirdCountAtom,
  gainResourceQuantityAtom,
  grasslandBirdEggReqAtom,
  totalEggCountAtom,
} from "../../../utils/jotaiStore";
import {
  activateHabitat,
  eggReqCheck,
} from "../../../utils/gameFunctions/habitatFunctions";

const grassland = () => {
  //grassland state
  const [grassland] = useAtom(grasslandAtom);
  const [birdCount] = useAtom(grasslandBirdCountAtom);
  const [grasslandBirdEggReq] = useAtom(grasslandBirdEggReqAtom);

  const grasslandArray = Object.keys(grassland);
  const grasslandContent = grasslandArray.map((space) => (
    <GrasslandActionSpace key={space} space={space} />
  ));

  //set current action
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const currentSpace = grassland[birdCount];

  //total egg count
  const [totalEggCount] = useAtom(totalEggCountAtom);

  //resource quantity
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  //habitat bird count for bird count Check
  const [forestBirdCount] = useAtom(forestBirdCountAtom);
  const [wetlandBirdCount] = useAtom(wetlandBirdCountAtom);

  //if true can't place eggs
  const birdCountCheck =
    forestBirdCount === 0 && wetlandBirdCount === 0 && birdCount === 0;

  //discard for +1 resource
  const grasslandDiscardStates = {
    habitats: true,
    playedBird: false,
    playerFood: false,
    eggSupply: false,
  };
  //enable when activated
  const grasslandEnableState = {
    habitats: true,
    eggSupply: false,
    playedBird: false,
  };

  //selecting habitat for play a bird
  const [, setHabitat] = useAtom(selectedHabitatAtom);

  //disabled states
  const [disabledStates, setDisabledStates] = useAtom(disabledStatesAtom);
  const grasslandDisable = disabledStates.habitats;

  const grasslandClick = () => {
    if (grasslandDisable) {
      console.log("disabled");
    } else {
      if (currentAction === "playABird") {
        eggReqCheck(
          grasslandBirdEggReq,
          "grassland",
          setDisabledStates,
          totalEggCount,
          setResourceQuantity,
          setHabitat
        );
      } else {
        if (birdCountCheck) {
          console.log("can't place any eggs, pick diff habitat to play");
        } else {
          activateHabitat(
            "grassland",
            setDisabledStates,
            setCurrentAction,
            currentSpace.action,
            setResourceQuantity,
            grasslandDiscardStates,
            grasslandEnableState
          );
        }
      }
    }
  };

  return (
    <div
      className="bg-amber-500 py-5 grid grid-cols-7 items-center justify-items-center "
      onClick={grasslandClick}
    >
      <div>
        <p className="font-bold text-2xl text-center">Grassland</p>
        <p className="text-center font-xl">
          Can currently gain {resourceQuantity} eggs
        </p>
      </div>
      <div className="col-span-6 grid grid-cols-6 px-5">{grasslandContent}</div>
    </div>
  );
};

export default grassland;
