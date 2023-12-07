import { useAtom } from "jotai";
import { useState } from "react";
import {
  disabledStatesAtom,
  currentActionAtom,
  birdHandAtom,
  selectedBirdsAtom,
  disableSelectionAtom,
  selectedHabitatAtom,
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

  //current habitat for play a bird action
  const [selectedHabitat] = useAtom(selectedHabitatAtom);

  //food reqs
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
        //if bird habitat includes selected habitat
        if (bird.habitat.includes(selectedHabitat)) {
          console.log(`Can play this bird in ${selectedHabitat}`);
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
        } else {
          console.log("can't play bird here. Pick a different bird");
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
      className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900 text-center flex flex-col gap-2 w-56 h-72 justify-between"
      onClick={birdCardClick}
    >
      <p className=" text-lg">{bird.common_name}</p>
      <div className="flex gap-3">{habitatContent}</div>
      <div className="flex gap-3 flex-wrap">{foodReqContent}</div>

      <p>Egg Limit: {bird.egg_limit}</p>
    </div>
  );
};

export default BirdCard;
