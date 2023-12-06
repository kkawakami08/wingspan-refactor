import { useAtom } from "jotai";
import { forestAtom, forestBirdCountAtom } from "../../../utils/jotaiStore";
import { ForestPlayedBirdCard, ActionSpace } from "./";

const ForestActionSpace = ({ space }) => {
  const [forest] = useAtom(forestAtom);
  const [forestBirdCount] = useAtom(forestBirdCountAtom);
  const currentSpace = forest[space];

  const activeCSS =
    forestBirdCount === Number(space)
      ? "bg-white flex flex-col text-center gap-2 justify-center border-2 border-emerald-900 rounded-lg px-10"
      : "flex flex-col text-center gap-2 justify-center border-2 border-emerald-900 rounded-lg px-10";

  if (currentSpace.bird !== null) {
    return <ForestPlayedBirdCard space={space} />;
    // <p>BIRD</p>;
  } else {
    return (
      <ActionSpace
        activeCSS={activeCSS}
        currentSpace={currentSpace.action}
        space={space}
      />
    );
  }
};

export default ForestActionSpace;
