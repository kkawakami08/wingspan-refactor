import { useAtom } from "jotai";
import { WetlandActionSpace } from "../individual/";
import {
  wetlandAtom,
  currentActionAtom,
  disabledStatesAtom,
  wetlandBirdCountAtom,
  gainResourceQuantityAtom,
  disableSelectionAtom,
} from "../../../utils/jotaiStore";

import {
  initialDisabledStates,
  initialDisableSelectionState,
} from "../../../data/initialData";

const wetland = () => {
  const [wetland] = useAtom(wetlandAtom);
  const [birdCount] = useAtom(wetlandBirdCountAtom);

  const wetlandArray = Object.keys(wetland);
  const wetlandContent = wetlandArray.map((space) => (
    <WetlandActionSpace key={space} space={space} />
  ));

  //set current action
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const currentSpace = wetland[birdCount];

  //disabled states
  const [, setDisabledStates] = useAtom(disabledStatesAtom);
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  const activateHabitat = () => {
    setDisabledStates(initialDisabledStates);
    setDisableSelection(initialDisableSelectionState);
    setCurrentAction("wetland");

    if (currentSpace.action.discard !== "none") {
      setDisabledStates((draft) => ({
        ...draft,
        birdDeck: false,
        birdTray: false,
        playerEggSupply: false,
      }));

      console.log(
        "Current action is forest: Birddeck, birdtray, playereggsupply enabled"
      );
    } else {
      setDisabledStates((draft) => ({
        ...draft,
        birdDeck: false,
        birdTray: false,
      }));
      console.log("Current action is forest: birddeck, birdtray enabled");
    }
    setResourceQuantity(currentSpace.action.quantity);
  };

  return (
    <div className="bg-sky-500 py-5" onClick={activateHabitat}>
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
