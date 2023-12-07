import { useAtom } from "jotai";
import { ForestActionSpace } from "../individual/";
import {
  currentActionAtom,
  disabledStatesAtom,
  forestAtom,
  gainResourceQuantityAtom,
  forestBirdCountAtom,
  selectedHabitatAtom,
  totalEggCountAtom,
  forestBirdEggReqAtom,
} from "../../../utils/jotaiStore";
import {
  activateHabitat,
  eggReqCheck,
} from "../../../utils/gameFunctions/habitatFunctions";

const Forest = () => {
  //forest state
  const [forest] = useAtom(forestAtom);
  const [birdCount] = useAtom(forestBirdCountAtom);

  const forestArray = Object.keys(forest);
  const forestContent = forestArray.map((space) => (
    <ForestActionSpace key={space} space={space} />
  ));

  //set current action
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const currentSpace = forest[birdCount];

  //disabled states
  const [disabledStates, setDisabledStates] = useAtom(disabledStatesAtom);
  const forestDisable = disabledStates.habitats;

  //discard for +1 resource
  const forestDiscardStates = {
    habitats: true,

    birdFeeder: false,
    birdHand: false,
  };
  //enable when activated
  const forestEnableState = {
    habitats: true,
    playABird: true,
    birdFeeder: false,
  };

  //resource gain quantity
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  //total egg count
  const [totalEggCount, setTotalEggCount] = useAtom(totalEggCountAtom);

  //select forest habitat for play a bird
  const [, setHabitat] = useAtom(selectedHabitatAtom);

  //egg req for play a bird in forest
  const [forestBirdEggReq, setForestBirdEggReq] = useAtom(forestBirdEggReqAtom);

  const forestClick = () => {
    if (forestDisable) {
      console.log("disabled");
    } else {
      if (currentAction === "playABird") {
        eggReqCheck(
          forestBirdEggReq,
          "forest",
          setDisabledStates,
          totalEggCount,
          setResourceQuantity,
          setHabitat
        );
      } else {
        activateHabitat(
          "forest",
          setDisabledStates,
          setCurrentAction,
          currentSpace.action,
          setResourceQuantity,
          forestDiscardStates,
          forestEnableState
        );
      }
    }
  };

  return (
    <div
      className="bg-emerald-500 py-5 grid grid-cols-7 items-center justify-items-center "
      onClick={forestClick}
    >
      <div>
        <p className="font-bold text-2xl text-center">Forest</p>
        <p className="text-center font-xl">
          Can currently gain {resourceQuantity} dice
        </p>
        <p>Currently need {forestBirdEggReq} eggs to play a bird here</p>
      </div>
      <div className="col-span-6 grid grid-cols-6 px-5">{forestContent}</div>
    </div>
  );
};

export default Forest;
