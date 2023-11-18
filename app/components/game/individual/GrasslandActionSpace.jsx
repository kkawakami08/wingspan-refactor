import { useAtom } from "jotai";
import {
  grasslandAtom,
  grasslandBirdCountAtom,
} from "../../../utils/jotaiStore";

const GrasslandActionSpace = ({ space }) => {
  const [grassland] = useAtom(grasslandAtom);
  const [grasslandBirdCount] = useAtom(grasslandBirdCountAtom);
  const currentSpace = grassland[space];

  const activeCSS =
    grasslandBirdCount === Number(space)
      ? "bg-white flex flex-col text-center gap-2 justify-center border-2 border-emerald-900 rounded-lg"
      : "flex flex-col text-center gap-2 justify-center border-2 border-emerald-900 rounded-lg";

  return (
    <div className={activeCSS}>
      <p>Space {space}</p>
      <p>
        Gain {currentSpace.action.quantity} {currentSpace.action.type}
      </p>
      {currentSpace.action.discard !== "none" && (
        <p>Discard {currentSpace.action.discard}</p>
      )}
    </div>
  );
};

export default GrasslandActionSpace;
