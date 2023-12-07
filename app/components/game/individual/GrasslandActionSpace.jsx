import { useAtom } from "jotai";
import {
  grasslandAtom,
  grasslandBirdCountAtom,
} from "../../../utils/jotaiStore";
import { GrasslandPlayedBirdCard, ActionSpace } from "./";

const GrasslandActionSpace = ({ space }) => {
  const [grassland] = useAtom(grasslandAtom);
  const [grasslandBirdCount] = useAtom(grasslandBirdCountAtom);
  const currentSpace = grassland[space];

  const activeCSS =
    grasslandBirdCount === Number(space)
      ? "bg-white flex flex-col text-center gap-2 justify-center border-2 border-emerald-900 rounded-lg px-10"
      : "flex flex-col text-center gap-2 justify-center border-2 border-emerald-900 rounded-lg px-10";

  if (currentSpace.bird !== null) {
    return <GrasslandPlayedBirdCard space={space} />;
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

export default GrasslandActionSpace;
