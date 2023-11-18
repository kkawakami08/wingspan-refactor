import { useAtom } from "jotai";
import { disablePlayerFoodAtom } from "../../../utils/jotaiStore";

const FoodToken = ({ food }) => {
  const [disableFood] = useAtom(disablePlayerFoodAtom);

  const testFunc = () => {
    if (disableFood) {
      console.log("Disabled");
    } else {
      console.log("Clicked!");
    }
  };

  return (
    <div className="bg-indigo-400 p-3 rounded-lg text-white" onClick={testFunc}>
      <p>{food.type}</p>
    </div>
  );
};

export default FoodToken;
