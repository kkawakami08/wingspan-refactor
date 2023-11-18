import { atom } from "jotai";

//import test data
import { playerBirdHand, birdTray, birdDeck } from "../data/testingBirdCards";
import {
  playerFoodSupply,
  initialForest,
  initialGrassland,
  initialWetland,
} from "../data/initialData";

//initial player states
export const birdHandAtom = atom(playerBirdHand);
export const playerFoodSupplyAtom = atom(playerFoodSupply);

//initial game states
export const birdTrayAtom = atom(birdTray);
export const birdDeckAtom = atom(birdDeck);

export const forestAtom = atom(initialForest);
export const grasslandtAtom = atom(initialGrassland);
export const wetlandAtom = atom(initialWetland);

export const forestBirdCountAtom = atom(0);
export const grasslandBirdCountAtom = atom(0);
export const wetlandBirdCountAtom = atom(0);

//initial Disabled States
export const disableBirdCardAtom = atom(true);
export const disablePlayerFoodAtom = atom(true);
export const disableBirdDeckAtom = atom(true);
export const disableBirdTrayAtom = atom(true);
