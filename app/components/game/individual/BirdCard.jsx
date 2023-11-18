import { useAtom } from "jotai";
import { disabledStatesAtom } from "../../../utils/jotaiStore";

const BirdCard = ({ bird }) => {
  const [disableState] = useAtom(disabledStatesAtom);
  const disableBirdCard = disableState.birdHand;

  const testFunc = () => {
    if (disableBirdCard) {
      console.log("Disabled");
    } else {
      console.log("Clicked!");
    }
  };

  return (
    <div
      className="bg-cyan-500 p-5 rounded-lg border-2 border-cyan-900"
      onClick={testFunc}
    >
      <p>{bird.common_name}</p>
    </div>
  );
};

export default BirdCard;
