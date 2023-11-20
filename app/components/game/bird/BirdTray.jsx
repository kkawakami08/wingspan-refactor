import { useAtom } from "jotai";
import { birdTrayAtom } from "../../../utils/jotaiStore";
import { BirdTrayCard } from "../individual";

const BirdTray = () => {
  const [birdTray] = useAtom(birdTrayAtom);

  const birdTrayContent = birdTray.map((bird) => (
    <BirdTrayCard key={bird.common_name} bird={bird} />
  ));

  return (
    <div className="">
      <p>Bird Tray</p>
      <div className="flex gap-3">{birdTrayContent}</div>
    </div>
  );
};

export default BirdTray;
