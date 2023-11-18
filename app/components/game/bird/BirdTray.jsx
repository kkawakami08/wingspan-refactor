import { useAtom } from "jotai";
import { birdTrayAtom, disabledStatesAtom } from "../../../utils/jotaiStore";
import { BirdTrayCard } from "../individual";

const BirdTray = () => {
  const [birdTray] = useAtom(birdTrayAtom);
  const [disableState] = useAtom(disabledStatesAtom);
  const disableBirdTray = disableState.birdTray;

  const birdTrayContent = birdTray.map((bird) => (
    <BirdTrayCard key={bird.common_name} bird={bird} />
  ));

  const testFunc = () => {
    if (disableBirdTray) {
      console.log("Disabled");
    } else {
      console.log("Clicked!");
    }
  };
  return (
    <div className="">
      <p>Bird Tray</p>
      <div className="flex gap-3" onClick={testFunc}>
        {birdTrayContent}
      </div>
    </div>
  );
};

export default BirdTray;
