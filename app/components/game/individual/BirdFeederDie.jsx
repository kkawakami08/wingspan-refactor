import { useAtom } from "jotai";
import {
  disabledStatesAtom,
  birdFeederAtom,
  selectedFoodAtom,
  gainResourceQuantityAtom,
  disableSelectionAtom,
} from "../../../utils/jotaiStore";
import { foodSelection } from "../../../utils/gameFunctions/birdFeederFunctions";

const BirdFeederDie = ({ die }) => {
  //disable states
  const [disableState] = useAtom(disabledStatesAtom);
  const disableBirdFeeder = disableState.birdFeeder;
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  //food state
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

  //resource quantity
  const [resourceQuantity] = useAtom(gainResourceQuantityAtom);

  const birdFeederDieClick = () => {
    if (disableBirdFeeder) {
      console.log("Disabled");
    } else {
      foodSelection(birdFeeder, setSelectedFood, setBirdFeeder, die.id);

      if (selectedFood.length + 1 === resourceQuantity) {
        setDisableSelection((prev) => ({ ...prev, food: false }));
      } else {
        setDisableSelection((prev) => ({ ...prev, food: true }));
      }
    }
  };

  return (
    <div
      className="bg-indigo-400 p-3 rounded-lg text-white"
      onClick={birdFeederDieClick}
    >
      <p>{die.type}</p>
    </div>
  );
};

export default BirdFeederDie;
