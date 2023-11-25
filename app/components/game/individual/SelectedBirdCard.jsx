import { useAtom } from "jotai";
import {
  birdHandAtom,
  currentActionAtom,
  birdTrayAtom,
  selectedBirdsAtom,
  disableSelectionAtom,
  gainResourceQuantityAtom,
} from "../../../utils/jotaiStore";
import { cardSelection } from "../../../utils/gameFunctions/generalFunctions";

const SelectedBirdCard = ({ bird }) => {
  //disable states
  const [disableSelection, setDisableSelection] = useAtom(disableSelectionAtom);

  //bird card states
  const [, setBirdHand] = useAtom(birdHandAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdTray] = useAtom(birdTrayAtom);

  //current action
  const [currentAction] = useAtom(currentActionAtom);

  //resource quantity
  const [resourceQuantity] = useAtom(gainResourceQuantityAtom);

  //food
  const foodReqContent = bird.food.map((food, index) => (
    <p key={index} className="bg-cyan-900 text-white p-2 rounded-lg">
      {food}
    </p>
  ));

  const selectedBirdCardClick = () => {
    if (currentAction === "forest") {
      cardSelection(
        selectedBirds,
        "common_name",
        bird.common_name,
        setBirdHand,
        setSelectedBirds
      );

      if (selectedBirds.length === 1) {
        setDisableSelection((prev) => ({ ...prev, bird: false }));
      } else {
        setDisableSelection((prev) => ({ ...prev, bird: true }));
      }
    } else if (currentAction === "wetland") {
      cardSelection(
        selectedBirds,
        "common_name",
        bird.common_name,
        setBirdTray,
        setSelectedBirds
      );
      console.log(resourceQuantity, "resource quantity");
      if (selectedBirds.length === resourceQuantity) {
        setDisableSelection((prev) => ({ ...prev, bird: false }));
      } else {
        setDisableSelection((prev) => ({ ...prev, bird: true }));
      }
    } else if (currentAction === "playABird") {
      if (disableSelection.playBirdSelection) {
        cardSelection(
          selectedBirds,
          "common_name",
          bird.common_name,
          setBirdHand,
          setSelectedBirds
        );
        if (selectedBirds.length === 1) {
          setDisableSelection((prev) => ({ ...prev, bird: false }));
        } else {
          setDisableSelection((prev) => ({ ...prev, bird: true }));
        }
      } else {
        console.log("disabled");
      }
    } else {
      console.log("Cannot select birds");
    }
  };

  return (
    <div
      className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900"
      onClick={selectedBirdCardClick}
    >
      <p>{bird.common_name}</p>
      <div className="flex gap-3">{foodReqContent}</div>
    </div>
  );
};

export default SelectedBirdCard;
