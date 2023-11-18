import { useAtom } from "jotai";
import { WetlandActionSpace } from "../individual/";
import {
  wetlandAtom,
  currentActionAtom,
  disabledStatesAtom,
} from "../../../utils/jotaiStore";

import { initialDisabledStates } from "../../../data/initialData";

const wetland = () => {
  const [wetland] = useAtom(wetlandAtom);

  const wetlandArray = Object.keys(wetland);
  const wetlandContent = wetlandArray.map((space) => (
    <WetlandActionSpace key={space} space={space} />
  ));

  //set current action
  const [, setCurrentAction] = useAtom(currentActionAtom);

  //disabled states
  const [, setDisabledStates] = useAtom(disabledStatesAtom);

  const activateWetland = () => {
    setDisabledStates(initialDisabledStates);
    setCurrentAction("wetland");
    console.log(
      "Current action is wetland. birddeck, birdtray, playereggsupply enabled"
    );
    setDisabledStates((draft) => ({
      ...draft,
      birdDeck: false,
      birdTray: false,
      playerEggSupply: false,
    }));
  };

  return (
    <div className="bg-sky-500 py-5" onClick={activateWetland}>
      <p>wetland</p>
      <div className="flex">{wetlandContent}</div>
    </div>
  );
};

export default wetland;
