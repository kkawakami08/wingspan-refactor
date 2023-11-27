import { PlayerSetup } from "./player";
import { BirdDeck, BirdTray, SelectedBirds } from "./bird";
import { BirdFeeder, SelectedFood } from "./food";
import { HabitatMat } from "./mat";
import { EggSupply } from "./eggs";

const GameLayout = () => {
  return (
    <div className="flex flex-col gap-5">
      <PlayerSetup />
      <BirdDeck />
      <BirdTray />
      <BirdFeeder />
      <EggSupply />
      <SelectedBirds />
      <SelectedFood />
      <HabitatMat />
    </div>
  );
};

export default GameLayout;
