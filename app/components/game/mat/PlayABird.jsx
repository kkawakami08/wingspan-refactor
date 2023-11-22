import { useAtom } from "jotai";
import {
  currentActionAtom,
  disabledStatesAtom,
  forestBirdCountAtom,
  disableSelectionAtom,
  selectedHabitatAtom,
} from "../../../utils/jotaiStore";
import { initialDisabledStates } from "../../../data/initialData";

const PlayABird = () => {
  const [forestBirdCount] = useAtom(forestBirdCountAtom);

  //set current action
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const [selectedHabitat] = useAtom(selectedHabitatAtom);

  //disabled states
  const [, setDisabledStates] = useAtom(disabledStatesAtom);
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  const activateHabitat = () => {
    setDisabledStates(initialDisabledStates);
    // setDisableSelection((draft) => ({
    //   ...draft,

    //   bird: false
    // }));
    setCurrentAction("playABird");
    console.log("Current action:: Play a bird. Select a habitat");
    // console.log("birdhand, food supply, egg supply enabled");
    // setDisabledStates((draft) => ({
    //   ...draft,

    //   birdHand: false,
    //   foodSupply: false,
    //   playerEggSupply: false,
    // }));
  };

  return (
    <div className="bg-pink-500 py-5 flex gap-5" onClick={activateHabitat}>
      <p>Play A Bird</p>
      {selectedHabitat !== "" && <p>Selected Habitat: {selectedHabitat}</p>}
    </div>
  );
};

export default PlayABird;
