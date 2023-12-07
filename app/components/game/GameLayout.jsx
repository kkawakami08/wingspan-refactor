import { PlayerSetup } from "./player";
import { BirdDeck, BirdTray, SelectedBirds } from "./bird";
import { BirdFeeder, SelectedFood } from "./food";
import { HabitatMat } from "./mat";
import { EggSupply } from "./eggs";

const GameLayout = () => {
  return (
    <div className="grid-cols-3 grid gap-5 justify-center p-5">
      <PlayerSetup />
      <div className="flex flex-col gap-5 col-span-2">
        <div className="flex gap-5 flex-col">
          <BirdTray />
          <BirdDeck />
        </div>
        <div className="flex gap-10">
          <BirdFeeder />
          <EggSupply />
        </div>
      </div>

      <SelectedBirds />
      <SelectedFood />
      <HabitatMat />
    </div>
  );
};

export default GameLayout;
