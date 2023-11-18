import { useAtom } from "jotai";
import { ForestActionSpace } from "../individual/";
import {
  currentActionAtom,
  disabledStatesAtom,
  forestAtom,
} from "../../../utils/jotaiStore";
import { initialDisabledStates } from "../../../data/initialData";

const Forest = () => {
  const [forest] = useAtom(forestAtom);

  const forestArray = Object.keys(forest);
  const forestContent = forestArray.map((space) => (
    <ForestActionSpace key={space} space={space} />
  ));

  //set current action
  const [, setCurrentAction] = useAtom(currentActionAtom);

  //disabled states
  const [, setDisabledStates] = useAtom(disabledStatesAtom);

  const activateForest = () => {
    setDisabledStates(initialDisabledStates);
    setCurrentAction("forest");
    console.log("Current action is forest: Birdfeeder, BirdHand enabled");
    setDisabledStates((draft) => ({
      ...draft,
      birdFeeder: false,
      birdHand: false,
    }));
  };

  return (
    <div className="bg-emerald-500 py-5" onClick={activateForest}>
      <p>Forest</p>
      <div className="flex">{forestContent}</div>
    </div>
  );
};

export default Forest;
