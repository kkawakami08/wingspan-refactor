import { PlayerSetup } from "./player";
import { BirdDeck, BirdTray, SelectedBirds } from "./bird";
import { HabitatMat } from "./mat";

const GameLayout = () => {
  return (
    <div className="flex flex-col gap-5">
      <PlayerSetup />
      <BirdDeck />
      <BirdTray />
      <SelectedBirds />
      <HabitatMat />
    </div>
  );
};

export default GameLayout;
