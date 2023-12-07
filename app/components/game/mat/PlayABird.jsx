import { useAtom } from "jotai";
import {
  currentActionAtom,
  disabledStatesAtom,
  selectedHabitatAtom,
} from "../../../utils/jotaiStore";
import { initialDisabledStates } from "../../../data/initialData";

const PlayABird = () => {
  //set current action
  const [, setCurrentAction] = useAtom(currentActionAtom);

  //habitat to play a bird
  const [selectedHabitat] = useAtom(selectedHabitatAtom);

  //disabled states
  const [disabledStates, setDisabledStates] = useAtom(disabledStatesAtom);
  const playABirdDisable = disabledStates.habitats;

  const playABirdClick = () => {
    if (playABirdDisable) {
      console.log("Disabled");
    } else {
      setDisabledStates(initialDisabledStates);
      //check egg req

      setCurrentAction("playABird");
      console.log("Current action:: Play a bird. Select a habitat");
    }
  };

  return (
    <div
      className="bg-pink-500 py-5 grid grid-cols-7 items-center justify-items-center"
      onClick={playABirdClick}
    >
      <p className="font-bold text-2xl text-center ">Play A Bird</p>
      <p>No egg</p>
      <p>One egg</p>
      <p>One egg</p>
      <p>Two egg</p>
      <p>Two egg</p>
      <p>Max</p>
    </div>
  );
};

export default PlayABird;
