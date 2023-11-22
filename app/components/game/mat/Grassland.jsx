import { useAtom } from "jotai";
import { GrasslandActionSpace } from "../individual/";
import {
  currentActionAtom,
  grasslandAtom,
  disabledStatesAtom,
  selectedHabitatAtom,
} from "../../../utils/jotaiStore";
import { initialDisabledStates } from "../../../data/initialData";

const grassland = () => {
  const [grassland] = useAtom(grasslandAtom);

  const grasslandArray = Object.keys(grassland);
  const grasslandContent = grasslandArray.map((space) => (
    <GrasslandActionSpace key={space} space={space} />
  ));

  //set current action
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setSelectedHabitat] = useAtom(selectedHabitatAtom);

  //disabled states
  const [, setDisabledStates] = useAtom(disabledStatesAtom);

  const activateGrassland = () => {
    if (currentAction === "playABird") {
      console.log("Selected grassland. pick a bird now");
      setSelectedHabitat("grassland");
      setDisabledStates((draft) => ({
        ...draft,

        birdHand: false,
      }));
    } else {
      setDisabledStates(initialDisabledStates);
      setCurrentAction("grassland");
      console.log(
        "Current action is grassland.   playerfood, eggsupply enabled"
      );
      setDisabledStates((draft) => ({
        ...draft,
        playerFood: false,
        eggSupply: false,
      }));
    }
  };

  return (
    <div className="bg-amber-500 py-5" onClick={activateGrassland}>
      <p>grassland</p>
      <div className="flex">{grasslandContent}</div>
    </div>
  );
};

export default grassland;
