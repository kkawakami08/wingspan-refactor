import { nanoid } from "nanoid";

export const rollBirdFeeder = () => {
  let birdFeederSupply = [];

  for (let i = 0; i < 5; i++) {
    let dieFace = Math.floor(Math.random() * 6 + 1);

    switch (dieFace) {
      case 1:
        birdFeederSupply.push({ type: "seed", id: nanoid() });
        break;
      case 2:
        birdFeederSupply.push({ type: "invertebrate", id: nanoid() });
        break;
      case 3:
        birdFeederSupply.push({ type: "fruit", id: nanoid() });
        break;
      case 4:
        birdFeederSupply.push({ type: "rodent", id: nanoid() });
        break;
      case 5:
        birdFeederSupply.push({ type: "fish", id: nanoid() });
        break;
      case 6:
        birdFeederSupply.push({ type: "invertebrate_seed", id: nanoid() });
        break;
    }
  }

  return birdFeederSupply;
};

export const enableRolling = (birdFeederSupply, setDisableSelection) => {
  if (birdFeederSupply.every((die) => die.type === birdFeederSupply[0].type)) {
    console.log("Can roll");
    setDisableSelection((draft) => ({
      ...draft,
      birdFeeder: false,
    }));
  } else {
    console.log("Cannot roll");
    setDisableSelection((draft) => ({
      ...draft,
      birdFeeder: true,
    }));
  }
};

export const foodSelection = (source, setDestination, setSource, foodId) => {
  let initialSupply = source;

  const index = initialSupply.map((e) => e.id).indexOf(foodId);

  const [item] = initialSupply.splice(index, 1);

  setDestination((prev) => [...prev, item]);
  setSource([...initialSupply]);
};
