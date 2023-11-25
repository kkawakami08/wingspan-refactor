import { useAtom } from "jotai";
import { GrasslandActionSpace } from "../individual/";
import {
  currentActionAtom,
  grasslandAtom,
  disabledStatesAtom,
  selectedHabitatAtom,
  grasslandBirdCountAtom,
  gainResourceQuantityAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";

const grassland = () => {
  //grassland state
  const [grassland] = useAtom(grasslandAtom);
  const [birdCount] = useAtom(grasslandBirdCountAtom);

  const grasslandArray = Object.keys(grassland);
  const grasslandContent = grasslandArray.map((space) => (
    <GrasslandActionSpace key={space} space={space} />
  ));

  //set current action
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const currentSpace = grassland[birdCount];

  //resource quantity
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  //discard for +1 resource
  const grasslandDiscardStates = {
    habitats: true,

    playerFood: false,
    eggSupply: false,
  };
  //enable when activated
  const grasslandEnableState = {
    habitats: true,
    eggSupply: false,
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
      activateHabitat(
        currentAction,
        setHabitat,
        "grassland",
        setDisabledStates,
        setCurrentAction,
        currentSpace.action,
        setResourceQuantity,
        grasslandDiscardStates,
        grasslandEnableState
      );
    }
  };

  return (
    <div className="bg-amber-500 py-5" onClick={grasslandClick}>
      <p>grassland</p>
      <div className="flex">{grasslandContent}</div>
    </div>
  );
};

export default grassland;
