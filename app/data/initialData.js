import { nanoid } from "nanoid";
import { rollBirdFeeder } from "../utils/gameFunctions/birdFeederFunctions";

export const playerFoodSupply = [
  { type: "fruit", id: nanoid() },
  { type: "fruit", id: nanoid() },
  { type: "fish", id: nanoid() },
  { type: "rodent", id: nanoid() },
  { type: "invertebrate", id: nanoid() },
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
      };
    } else {
      habitat[i] = {
        action: {
          type: resource,
          quantity: startingQuantity,
          discard: discard,
        },
        bird: null,
      };
      startingQuantity += 1;
    }
  }
  return habitat;
};
export const initialForest = createInitialHabitat("dice", "card", 1);
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
};

export const initialDisableSelectionState = {
  food: true,
  bird: true,
  birdFeeder: !initialDisableRolling,
  playBirdSelection: true,
};
