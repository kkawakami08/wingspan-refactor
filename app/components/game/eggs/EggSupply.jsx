import { useAtom } from "jotai";
import { disabledStatesAtom } from "../../../utils/jotaiStore";

const EggSupply = () => {
  //disabled states
  const [disabledStates] = useAtom(disabledStatesAtom);
  const eggSupplyDisable = disabledStates.eggSupply;

  const eggSupplyClick = () => {
    if (eggSupplyDisable) {
      console.log("disabled");
    } else {
    }
  };

  return (
    <div onClick={eggSupplyClick}>
      <p className="bg-orange-500 text-white p-5 w-32 rounded-lg">Egg supply</p>
    </div>
  );
};

export default EggSupply;
