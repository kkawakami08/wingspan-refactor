import { nanoid } from "nanoid";
import { rollBirdFeeder } from "../utils/gameFunctions/birdFeederFunctions";
import { playedBird } from "./testingBirdCards";

export const playerFoodSupply = [
  { type: "fruit", id: nanoid() },
  { type: "fruit", id: nanoid() },
  { type: "fish", id: nanoid() },
  { type: "rodent", id: nanoid() },
  { type: "invertebrate_seed", id: nanoid() },
];

const createInitialHabitat = (resource, discard, startingQuantity) => {
  let habitat = {};
  for (let i = 0; i < 6; i++) {
    if (i === 0 || i % 2 === 0) {
      habitat[i] = {
        action: {
          type: resource,
          quantity: startingQuantity,
          discard: "none",
        },
        bird: null,
        eggCount: 0,
        cacheCount: 0,
        tuckedCount: 0,
      };
    } else {
      habitat[i] = {
        action: {
          type: resource,
          quantity: startingQuantity,
          discard: discard,
        },
        bird: null,
        eggCount: 0,
        cacheCount: 0,
        tuckedCount: 0,
      };
      startingQuantity += 1;
    }
  }
  return habitat;
};

const testForest = createInitialHabitat("dice", "card", 1);
// testForest[0].bird = playedBird;

export const initialForest = testForest;
export const initialGrassland = createInitialHabitat("eggs", "food", 2);
export const initialWetland = createInitialHabitat("cards", "egg", 1);

const initialRoll = rollBirdFeeder();
const initialDisableRolling = initialRoll.every(
  (die) => die.type === initialRoll[0].type
);

export const initialBirdFeeder = initialRoll;

export const initialDisabledStates = {
  birdDeck: true,
  birdTray: true,

  birdHand: true,
  playerFood: true,
  birdFeeder: true,
  foodSupply: true,
  eggSupply: true,
  playerEggSupply: true,
  habitats: false,
  playedBird: true,
};

export const initialDisableSelectionState = {
  food: true,
  bird: true,
  birdFeeder: !initialDisableRolling,
  playBirdSelection: true,
};
