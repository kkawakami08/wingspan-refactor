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
  wetlandBirdEggReqAtom,
  totalEggCountAtom,
} from "../../../utils/jotaiStore";
import {
  activateHabitat,
  eggReqCheck,
} from "../../../utils/gameFunctions/habitatFunctions";
import {
  initialDisabledStates,
  initialDisableSelectionState,
} from "../../../data/initialData";

const wetland = () => {
  //wetland state
  const [wetland] = useAtom(wetlandAtom);
  const [birdCount] = useAtom(wetlandBirdCountAtom);
  const currentSpace = wetland[birdCount];
  const [wetlandBirdEggReq] = useAtom(wetlandBirdEggReqAtom);

  const wetlandArray = Object.keys(wetland);
  const wetlandContent = wetlandArray.map((space) => (
    <WetlandActionSpace key={space} space={space} />
  ));

  //total egg count
  const [totalEggCount] = useAtom(totalEggCountAtom);

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
    playedBird: false,
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
      if (currentAction === "playABird") {
        eggReqCheck(
          wetlandBirdEggReq,
          "wetland",
          setDisabledStates,
          totalEggCount,
          setResourceQuantity,
          setHabitat
        );
      } else {
        activateHabitat(
          "wetland",
          setDisabledStates,
          setCurrentAction,
          currentSpace.action,
          setResourceQuantity,
          wetlandDiscardStates,
          wetlandEnableState
        );
      }
    }
  };

  return (
    <div
      className="bg-sky-500 py-5 grid grid-cols-7 items-center justify-items-center"
      onClick={wetlandClick}
    >
      <div>
        <p className="font-bold text-2xl text-center">Wetland</p>
        <p className="text-center font-xl">
          Can currently gain {resourceQuantity} cards
        </p>
      </div>
      <div className="col-span-6 grid grid-cols-6 px-5">{wetlandContent}</div>
    </div>
  );
};

export default wetland;
