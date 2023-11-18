import { nanoid } from "nanoid";

export const playerFoodSupply = [
  { type: "seed", id: nanoid() },
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
