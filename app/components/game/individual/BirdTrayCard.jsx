import { useAtom } from "jotai";
import {
  currentActionAtom,
  disabledStatesAtom,
  disableSelectionAtom,
  selectedBirdsAtom,
  birdTrayAtom,
  gainResourceQuantityAtom,
} from "../../../utils/jotaiStore";
import { cardSelection } from "../../../utils/gameFunctions/generalFunctions";

const BirdTrayCard = ({ bird }) => {
  //bird states
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);

  //disabled states
  const [disableState] = useAtom(disabledStatesAtom);
  const disableBirdTray = disableState.birdTray;
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  //current action
  const [currentAction] = useAtom(currentActionAtom);

  //resource quantity
  const [resourceQuantity] = useAtom(gainResourceQuantityAtom);

  const birdTrayCardClick = () => {
    if (disableBirdTray) {
      console.log("Cant click");
    } else {
      if (currentAction === "wetland") {
        cardSelection(
          birdTray,
          "common_name",
          bird.common_name,
          setSelectedBirds,
          setBirdTray
        );
        console.log(resourceQuantity, "resource quantity");
        console.log("selected bird length", selectedBirds.length);
        if (selectedBirds.length + 1 === resourceQuantity) {
          setDisableSelection((prev) => ({ ...prev, bird: false }));
        } else {
          setDisableSelection((prev) => ({ ...prev, bird: true }));
        }
      }
    }
  };

  return (
    <div
      className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900"
      onClick={birdTrayCardClick}
    >
      <p>{bird.common_name}</p>
    </div>
  );
};

export default BirdTrayCard;
