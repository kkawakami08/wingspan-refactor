import { useAtom } from "jotai";
import { ForestActionSpace } from "../individual/";
import {
  currentActionAtom,
  disabledStatesAtom,
  forestAtom,
  gainResourceQuantityAtom,
  forestBirdCountAtom,
} from "../../../utils/jotaiStore";
import { initialDisabledStates } from "../../../data/initialData";

const Forest = () => {
  const [forest] = useAtom(forestAtom);
  const [birdCount] = useAtom(forestBirdCountAtom);

  const forestArray = Object.keys(forest);
  const forestContent = forestArray.map((space) => (
    <ForestActionSpace key={space} space={space} />
  ));

  //set current action
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const currentSpace = forest[birdCount];

  //disabled states
  const [, setDisabledStates] = useAtom(disabledStatesAtom);

  //resource gain quantity
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  const activateForest = () => {
    setDisabledStates(initialDisabledStates);
    setCurrentAction("forest");

    if (currentSpace.action.discard !== "none") {
      setDisabledStates((draft) => ({
        ...draft,
        birdFeeder: false,
        birdHand: false,
      }));
      console.log("Current action is forest: Birdfeeder, BirdHand enabled");
    } else {
      setDisabledStates((draft) => ({
        ...draft,
        birdFeeder: false,
      }));
      console.log("Current action is forest: Birdfeeder enabled");
    }
    setResourceQuantity(currentSpace.action.quantity);
  };

  return (
    <div className="bg-emerald-500 py-5" onClick={activateForest}>
      <p>Forest</p>
      <p>
        Can currently gain {resourceQuantity}
        dice
      </p>
      <div className="flex">{forestContent}</div>
    </div>
  );
};

export default Forest;
