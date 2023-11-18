import { useAtom } from "jotai";
import { disableBirdCardAtom } from "../../../utils/jotaiStore";

const BirdCard = ({ bird }) => {
  const [disableBirdCard] = useAtom(disableBirdCardAtom);

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
