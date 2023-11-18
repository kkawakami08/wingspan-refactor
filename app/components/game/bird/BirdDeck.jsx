import { useAtom } from "jotai";
import { birdDeckAtom, disabledStatesAtom } from "../../../utils/jotaiStore";

const BirdDeck = () => {
  const [disableState] = useAtom(disabledStatesAtom);
  const disableBirdDeck = disableState.birdDeck;

  const testFunc = () => {
    if (disableBirdDeck) {
      console.log("Disabled");
    } else {
      console.log("Clicked!");
    }
  };

  return (
    <div>
      <div
        className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900 w-40"
        onClick={testFunc}
      >
        <p>Bird Deck</p>
      </div>
    </div>
  );
};

export default BirdDeck;
