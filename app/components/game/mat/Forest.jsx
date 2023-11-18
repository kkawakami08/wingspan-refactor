import { useAtom } from "jotai";
import { ForestActionSpace } from "../individual/";
import { forestAtom } from "../../../utils/jotaiStore";

const Forest = () => {
  const [forest] = useAtom(forestAtom);

  const forestArray = Object.keys(forest);
  const forestContent = forestArray.map((space) => (
    <ForestActionSpace key={space} space={space} />
  ));

  return (
    <div className="bg-emerald-500">
      <p>Forest</p>
      <div className="flex">{forestContent}</div>
    </div>
  );
};

export default Forest;
