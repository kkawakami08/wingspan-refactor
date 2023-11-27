import { useAtom } from "jotai";
import { forestAtom, forestBirdCountAtom } from "../../../utils/jotaiStore";
import { BirdCard } from "./";

const ForestActionSpace = ({ space }) => {
  const [forest] = useAtom(forestAtom);
  const [forestBirdCount] = useAtom(forestBirdCountAtom);
  const currentSpace = forest[space];

  const activeCSS =
    forestBirdCount === Number(space)
      ? "bg-white flex flex-col text-center gap-2 justify-center border-2 border-emerald-900 rounded-lg"
      : "flex flex-col text-center gap-2 justify-center border-2 border-emerald-900 rounded-lg";

  if (currentSpace.bird !== null) {
    return <BirdCard bird={currentSpace.bird} />;
  } else {
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
  }
};

export default ForestActionSpace;
