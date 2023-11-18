import { useAtom } from "jotai";
import { GrasslandActionSpace } from "../individual/";
import {
  currentActionAtom,
  grasslandAtom,
  disabledStatesAtom,
} from "../../../utils/jotaiStore";
import { initialDisabledStates } from "../../../data/initialData";

const grassland = () => {
  const [grassland] = useAtom(grasslandAtom);

  const grasslandArray = Object.keys(grassland);
  const grasslandContent = grasslandArray.map((space) => (
    <GrasslandActionSpace key={space} space={space} />
  ));

  //set current action
  const [, setCurrentAction] = useAtom(currentActionAtom);

  //disabled states
  const [, setDisabledStates] = useAtom(disabledStatesAtom);

  const activateGrassland = () => {
    setDisabledStates(initialDisabledStates);
    setCurrentAction("grassland");
    console.log("Current action is grassland.   playerfood, eggsupply enabled");
    setDisabledStates((draft) => ({
      ...draft,
      playerFood: false,
      eggSupply: false,
    }));
  };

  return (
    <div className="bg-amber-500 py-5" onClick={activateGrassland}>
      <p>grassland</p>
      <div className="flex">{grasslandContent}</div>
    </div>
  );
};

export default grassland;
