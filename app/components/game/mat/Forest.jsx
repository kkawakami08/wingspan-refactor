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
        if (forestBirdEggReq === 0) {
          console.log("Don't need any eggs to play bird in this space");
          setHabitat("forest");
          setDisabledStates((draft) => ({
            ...draft,

            birdHand: false,
          }));
        } else if (forestBirdEggReq === 1) {
          if (totalEggCount < 1) {
            console.log("not enough eggs to play this bird");
          } else {
            console.log("discard an egg please");
            setResourceQuantity(1);
            setDisabledStates((prev) => ({
              ...prev,
              playedBird: false,
              habitats: true,
            }));
          }
        } else if (forestBirdEggReq === 2) {
          if (totalEggCount < 2) {
            console.log("not enough eggs to play this bird");
          } else {
            console.log("discard two eggs please");
            setResourceQuantity(2);
            setDisabledStates((prev) => ({
              ...prev,
              playedBird: false,
              habitats: true,
            }));
          }
        } else {
          console.log("Can't place any more birds in this habitat");
        }
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
