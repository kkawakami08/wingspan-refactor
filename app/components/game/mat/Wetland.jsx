import { useAtom } from "jotai";
import { WetlandActionSpace } from "../individual/";
import {
  wetlandAtom,
  currentActionAtom,
  disabledStatesAtom,
  wetlandBirdCountAtom,
  gainResourceQuantityAtom,
  disableSelectionAtom,
  selectedHabitatAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";
import {
  initialDisabledStates,
  initialDisableSelectionState,
} from "../../../data/initialData";

const wetland = () => {
  //wetland state
  const [wetland] = useAtom(wetlandAtom);
  const [birdCount] = useAtom(wetlandBirdCountAtom);
  const currentSpace = wetland[birdCount];

  const wetlandArray = Object.keys(wetland);
  const wetlandContent = wetlandArray.map((space) => (
    <WetlandActionSpace key={space} space={space} />
  ));

  //set current action
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);

  //select habitat for play a bird
  const [, setHabitat] = useAtom(selectedHabitatAtom);

  //disabled states
  const [disabledStates, setDisabledStates] = useAtom(disabledStatesAtom);
  const [, setDisableSelection] = useAtom(disableSelectionAtom);
  const wetlandDisable = disabledStates.habitats;

  //discard for +1 resource
  const wetlandDiscardStates = {
    habitats: true,
    birdDeck: false,
    birdTray: false,
    playerEggSupply: false,
  };
  //enable when activated
  const wetlandEnableState = {
    habitats: true,
    birdDeck: false,
    birdTray: false,
  };

  //gain resource
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  const wetlandClick = () => {
    if (wetlandDisable) {
      console.log("Disabled");
    } else {
      activateHabitat(
        currentAction,
        setHabitat,
        "wetland",
        setDisabledStates,
        setCurrentAction,
        currentSpace.action,
        setResourceQuantity,
        wetlandDiscardStates,
        wetlandEnableState
      );
    }
  };

  return (
    <div className="bg-sky-500 py-5" onClick={wetlandClick}>
      <p>wetland</p>
      <p>
        Can currently gain {resourceQuantity}
        cards
      </p>
      <div className="flex">{wetlandContent}</div>
    </div>
  );
};

export default wetland;
