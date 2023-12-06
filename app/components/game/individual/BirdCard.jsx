import { useAtom } from "jotai";
import { useState } from "react";
import {
  disabledStatesAtom,
  currentActionAtom,
  birdHandAtom,
  selectedBirdsAtom,
  disableSelectionAtom,
} from "../../../utils/jotaiStore";
import { cardSelection } from "../../../utils/gameFunctions/generalFunctions";

const BirdCard = ({ bird }) => {
  //disable states
  const [disableState] = useAtom(disabledStatesAtom);
  const disableBirdCard = disableState.birdHand;
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  //bird card states
  const [birdHand, setBirdHand] = useAtom(birdHandAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);

  //current action
  const [currentAction] = useAtom(currentActionAtom);

  //eggs
  const [eggCount, setEggCount] = useState(bird.egg_limit);

  //food reqs
  const foodReqContent = bird.food.map((food, index) => (
    <p key={index} className="bg-cyan-900 text-white p-2 rounded-lg">
      {food}
    </p>
  ));

  const birdCardClick = () => {
    if (disableBirdCard) {
      console.log("Disabled");
    } else {
      if (currentAction === "forest") {
        cardSelection(
          birdHand,
          "common_name",
          bird.common_name,
          setSelectedBirds,
          setBirdHand
        );
        console.log(selectedBirds.length);
        if (selectedBirds.length + 1 === 1) {
          setDisableSelection((prev) => ({ ...prev, bird: false }));
        } else {
          setDisableSelection((prev) => ({ ...prev, bird: true }));
        }
      } else if (currentAction === "playABird") {
        cardSelection(
          birdHand,
          "common_name",
          bird.common_name,
          setSelectedBirds,
          setBirdHand
        );
        if (selectedBirds.length + 1 === 1) {
          setDisableSelection((prev) => ({ ...prev, bird: false }));
        } else {
          setDisableSelection((prev) => ({ ...prev, bird: true }));
        }
      } else if (currentAction === "grassland") {
        console.log("Placed eggs on this bird");
      } else {
        console.log("Cannot select birds");
      }
    }
  };

  return (
    <div
      className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900 text-center flex flex-col gap-2"
      onClick={birdCardClick}
    >
      <p className=" text-lg">{bird.common_name}</p>
      <div className="flex gap-3">{foodReqContent}</div>
      <p>Egg Limit: {bird.egg_limit}</p>
    </div>
  );
};

export default BirdCard;
