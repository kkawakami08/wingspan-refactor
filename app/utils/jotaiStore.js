import { atom } from "jotai";

//import test data
import { playerBirdHand, birdTray, birdDeck } from "../data/testingBirdCards";
import {
  playerFoodSupply,
  initialForest,
  initialGrassland,
  initialWetland,
  initialDisabledStates,
  initialBirdFeeder,
  initialDisableSelectionState,
} from "../data/initialData";

//initial player states
export const birdHandAtom = atom(playerBirdHand);
export const playerFoodSupplyAtom = atom(playerFoodSupply);

//initial game states
//cards
export const birdTrayAtom = atom(birdTray);
export const birdDeckAtom = atom(birdDeck);
export const birdDiscardAtom = atom([]);

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

//habitat play a bird egg req
export const forestBirdEggReqAtom = atom(0);
export const grasslandBirdEggReqAtom = atom(0);
export const wetlandBirdEggReqAtom = atom(0);

//resource gain amount
export const gainResourceQuantityAtom = atom(0);

//bird Feeder
export const birdFeederAtom = atom(initialBirdFeeder);

//initial Disabled States
export const disabledStatesAtom = atom(initialDisabledStates);
export const disableSelectionAtom = atom(initialDisableSelectionState);

//selected items
export const selectedBirdsAtom = atom([]);
export const selectedFoodAtom = atom([]);
export const selectedHabitatAtom = atom("");

//play a bird requirements
export const birdFoodReqAtom = atom({});

//total egg count
export const totalEggCountAtom = atom(0);
