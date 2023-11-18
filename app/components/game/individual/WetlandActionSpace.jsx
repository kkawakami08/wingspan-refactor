import { useAtom } from "jotai";
import { wetlandAtom, wetlandBirdCountAtom } from "../../../utils/jotaiStore";

const WetlandActionSpace = ({ space }) => {
  const [wetland] = useAtom(wetlandAtom);
  const [wetlandBirdCount] = useAtom(wetlandBirdCountAtom);
  const currentSpace = wetland[space];

  const activeCSS =
    wetlandBirdCount === Number(space)
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

export default WetlandActionSpace;
