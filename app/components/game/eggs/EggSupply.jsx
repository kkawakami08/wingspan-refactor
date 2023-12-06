import { useAtom } from "jotai";
import {
  disabledStatesAtom,
  gainResourceQuantityAtom,
  currentActionAtom,
  disableSelectionAtom,
} from "../../../utils/jotaiStore";
import { resetGrassland } from "../../../utils/gameFunctions/eggFunctions";

const EggSupply = () => {
  //disabled states
  const [disabledStates, setDisabledStates] = useAtom(disabledStatesAtom);
  const eggSupplyDisable = disabledStates.eggSupply;
  const [, setDisableSelection] = useAtom(disableSelectionAtom);

  //current action
  const [, setCurrentAction] = useAtom(currentActionAtom);

  //available egg quantity
  const [resourceQuantity, setResourceQuantity] = useAtom(
    gainResourceQuantityAtom
  );

  const eggSupplyClick = () => {
    if (eggSupplyDisable) {
      console.log("disabled");
    } else {
      console.log("discarding remaining eggs");
      resetGrassland({
        setCurrentAction,
        setDisabledStates,
        setDisableSelection,
        setResourceQuantity,
      });
    }
  };

  return (
    <div
      className="bg-orange-500 text-white p-5 w-32 rounded-lg text-center"
      onClick={eggSupplyClick}
    >
      <p>Discard remaining</p>
      <p className="text-bold text-2xl">{resourceQuantity} </p>
      <p>eggs</p>
    </div>
  );
};

export default EggSupply;
