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

  const foodReqContent = bird.food.map((food, index) => (
    <p key={index} className="bg-cyan-900 text-white p-2 rounded-lg">
      {food}
    </p>
  ));

  //habitat
  const habitatContent = bird.habitat.map((habitat, index) => (
    <p key={index} className="bg-emerald-900 text-white p-2 rounded-lg">
      {habitat}
    </p>
  ));

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
      className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900 flex flex-col gap-3  w-56 h-72 justify-between"
      onClick={birdTrayCardClick}
    >
      <p className="text-lg">{bird.common_name}</p>
      <div className="flex gap-3 flex-wrap">{habitatContent}</div>
      <div className="flex gap-3 flex-wrap">{foodReqContent}</div>
      <p>Egg Limit: {bird.egg_limit}</p>
    </div>
  );
};

export default BirdTrayCard;
