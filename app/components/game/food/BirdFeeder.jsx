import { BirdFeederDie } from "../individual";
import { useAtom } from "jotai";
import {
  birdFeederAtom,
  disableSelectionAtom,
} from "../../../utils/jotaiStore";
import {
  rollBirdFeeder,
  enableRolling,
} from "../../../utils/gameFunctions/birdFeederFunctions";

const BirdFeeder = () => {
  //birdfeeder state
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);

  //disable states
  const [disableSelection, setDisableSelection] = useAtom(disableSelectionAtom);
  const disableRolling = disableSelection.birdFeeder;

  const birdFeederContent = birdFeeder.map((die) => (
    <BirdFeederDie key={die.id} die={die} />
  ));

  const rollDice = () => {
    const newRoll = rollBirdFeeder();
    setBirdFeeder(newRoll);
    enableRolling(newRoll, setDisableSelection);
  };

  return (
    <div>
      <p>Bird feeder</p>
      <div className="flex gap-3">{birdFeederContent}</div>
      <button
        onClick={rollDice}
        disabled={disableRolling}
        className="bg-indigo-900 text-white rounded-lg p-3 disabled:bg-indigo-100"
      >
        Roll BirdFeeder
      </button>
    </div>
  );
};

export default BirdFeeder;
