import { atom } from "jotai";

//import test data
import { playerBirdHand, birdTray, birdDeck } from "../data/testingBirdCards";
import {
  playerFoodSupply,
  initialForest,
  initialGrassland,
  initialWetland,
  initialDisabledStates,
} from "../data/initialData";

//initial player states
export const birdHandAtom = atom(playerBirdHand);
export const playerFoodSupplyAtom = atom(playerFoodSupply);

//initial game states
//cards
export const birdTrayAtom = atom(birdTray);
export const birdDeckAtom = atom(birdDeck);

//habitats
export const forestAtom = atom(initialForest);
export const grasslandAtom = atom(initialGrassland);
export const wetlandAtom = atom(initialWetland);

//current action
export const currentActionAtom = atom("");

//habitat bird count
export const forestBirdCountAtom = atom(0);
export const grasslandBirdCountAtom = atom(0);
export const wetlandBirdCountAtom = atom(0);

//initial Disabled States
export const disabledStatesAtom = atom(initialDisabledStates);
