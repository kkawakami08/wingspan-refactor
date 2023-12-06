import { useAtom } from "jotai";
import { ForestActionSpace } from "../individual/";
import {
  currentActionAtom,
  disabledStatesAtom,
  forestAtom,
  gainResourceQuantityAtom,
  forestBirdCountAtom,
  selectedHabitatAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";

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

  //select forest habitat for play a bird
  const [, setHabitat] = useAtom(selectedHabitatAtom);

  const forestClick = () => {
    if (forestDisable) {
      console.log("disabled");
    } else {
      activateHabitat(
        currentAction,
        setHabitat,
        "forest",
        setDisabledStates,
        setCurrentAction,
        currentSpace.action,
        setResourceQuantity,
        forestDiscardStates,
        forestEnableState
      );
    }
  };

  return (
    <div
      className="bg-emerald-500 py-5 flex flex-col gap-3"
      onClick={forestClick}
    >
      <p className="font-bold text-2xl text-center">Forest</p>
      <p className="text-center font-xl">
        Can currently gain {resourceQuantity} dice
      </p>
      <div className="flex justify-center gap-5 px-5">{forestContent}</div>
    </div>
  );
};

export default Forest;
