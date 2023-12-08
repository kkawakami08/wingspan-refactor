import { current } from "immer";
import { initialDisabledStates } from "../../data/initialData";

export const checkEnoughFood = (playedBird, playerFoodSupply) => {
  //count how many foods required by future bird
  let playedBirdFoodCount = {};
  for (const food of playedBird) {
    playedBirdFoodCount[food] = playedBirdFoodCount[food] + 1 || 1;
  }
  //count how many foods player has
  let playerSupply = {};
  for (const { type } of playerFoodSupply) {
    playerSupply[type] = playerSupply[type] + 1 || 1;
  }

  console.log("playedBirdFood", playedBirdFoodCount);
  console.log("playerFoodCount", playerSupply);

  //copy player supply for checking if can use two for one if don't have enough
  let playerCheck = playerSupply;
  let checkLater = {};
  let canContinue = true;
  let wildDouble = {
    wild: 0,
    double: false,
    tokenReplacement: 0,
  };

  for (const food in playedBirdFoodCount) {
    if (food === "wild") {
      console.log("wild food");
      checkLater[food] = playedBirdFoodCount[food];
      wildDouble["wild"] = playedBirdFoodCount[food];
      console.log("updated checkfood", checkLater);
      canContinue = false;
    } else if (food === "seed" || food === "invertebrate") {
      console.log(`Checking ${food}`);
      if (playerCheck["invertebrate_seed"]) {
        console.log("Can use invertebrate_seed here");
        playerCheck["invertebrate_seed"] = playerCheck["invertebrate_seed"] - 1;
      } else {
        if (
          !playerCheck[food] ||
          playerCheck[food] < playedBirdFoodCount[food]
        ) {
          console.log(
            `Not enough ${food} in your supply. Adding to checkLater`
          );
          checkLater[food] = playedBirdFoodCount[food];
          console.log("Current check", checkLater);
          canContinue = false;
        } else {
          console.log("removing one from wildPlayer");
          playerCheck[food] = playerCheck[food] - 1;
          console.log("updated playercheck", playerCheck);
        }
      }
    } else {
      console.log(`Checking ${food}`);
      console.log("player[food]", playerCheck[food]);
      console.log("bird[food]", playedBirdFoodCount[food]);

      if (!playerCheck[food] || playerCheck[food] < playedBirdFoodCount[food]) {
        console.log(`Not enough ${food} in your supply. Adding to checkLater`);
        checkLater[food] = playedBirdFoodCount[food];
        console.log("Current check", checkLater);
        canContinue = false;
      } else {
        console.log("removing one from wildPlayer");
        playerCheck[food] = playerCheck[food] - 1;
        console.log("updated playercheck", playerCheck);
      }
    }
  }

  if (canContinue) {
    console.log("You have enough to play this bird");
    return {
      reqFood: playedBirdFoodCount,
      canPlay: true,
      ...wildDouble,
    };
  } else {
    let playerRemaining = 0;
    for (const food in playerCheck) {
      playerRemaining += playerCheck[food];
    }
    console.log(playerRemaining, " available tokens");
    if (checkLater["wild"]) {
      playerRemaining -= checkLater["wild"];
      console.log(
        `Removed ${checkLater["wild"]} for wild. remaining tokens: ${playerRemaining}`
      );
      checkLater["wild"] = 0;
    }
    let fufilled = Object.values(checkLater);
    console.log("fulfill", fufilled);
    canContinue = fufilled.every((item) => item === 0);
    console.log("good to go?: ", canContinue);
    if (canContinue) {
      wildDouble.double = false;
      return {
        reqFood: playedBirdFoodCount,
        canPlay: true,
        ...wildDouble,
      };
    } else {
      playerRemaining = Math.floor(playerRemaining / 2);
      console.log(`player can use ${playerRemaining} toookens`);

      for (const food in checkLater) {
        console.log(`Checking ${food} with ${checkLater[food]} amount`);
        playerRemaining -= checkLater[food];
        wildDouble.tokenReplacement =
          wildDouble.tokenReplacement + checkLater[food];
      }
      if (playerRemaining >= 0) {
        wildDouble.double = true;
        return {
          reqFood: playedBirdFoodCount,
          canPlay: true,
          ...wildDouble,
        };
      } else {
        wildDouble.tokenReplacement = 0;
        return {
          reqFood: playedBirdFoodCount,
          canPlay: false,
          ...wildDouble,
        };
      }
    }
  }
};

export const updateHabitat = (
  { setHabitat, habitatBirdCount, setHabitatBirdCount },
  selectedBird
) => {
  setHabitat((prev) => ({
    ...prev,
    [habitatBirdCount]: {
      ...prev[habitatBirdCount],
      bird: selectedBird,
    },
  }));

  setHabitatBirdCount((prev) => (prev += 1));
};

export const activateHabitat = (
  location,
  setDisabledStates,
  setCurrentAction,
  currentSpaceAction,
  setResourceQuantity,
  habitatDiscardStates,
  habitatEnableStates
) => {
  setDisabledStates(initialDisabledStates);

  setCurrentAction(location);

  if (currentSpaceAction.discard !== "none") {
    setDisabledStates((draft) => ({
      ...draft,
      ...habitatDiscardStates,
    }));
    console.log(`current action is ${location} can discard for extra resource`);
  } else {
    setDisabledStates((draft) => ({
      ...draft,
      ...habitatEnableStates,
    }));
    console.log(`current action is ${location}`);
  }
  setResourceQuantity(currentSpaceAction.quantity);
};
// };

export const playBird = (selectedFood, selectedBird, birdFoodReq) => {
  let foodCount = [];
  let neededTokens = 0;
  for (const { type } of selectedFood) {
    foodCount.push(type);
  }
  console.log("foodCount", foodCount);
  console.log("birdReq", selectedBird.food);
  for (let i = 0; i < selectedBird.food.length; i++) {
    let currentItem = selectedBird.food[i];
    if (currentItem === "wild") continue;
    if (
      foodCount.includes("invertebrate_seed") &&
      (currentItem === "seed" || currentItem === "invertebrate")
    ) {
      console.log("using invertebrate_seed token for ", currentItem);
      const index = foodCount.indexOf("invertebrate_seed");
      console.log(index);

      foodCount.splice(index, 1);

      continue;
    }
    const index = foodCount.indexOf(currentItem);
    console.log(index);
    if (index >= 0) {
      foodCount.splice(index, 1);
    } else {
      console.log(`no ${currentItem} found`);
      neededTokens++;
    }
    console.log("foodCount updated", foodCount);
  }
  let continueAction = false;
  console.log(birdFoodReq);
  if (birdFoodReq.wild) {
    console.log(`bird uses ${birdFoodReq.wild} wild tokens`);
    if (foodCount.length === birdFoodReq.wild) {
      console.log("you have enough tokens. placed bird");
      continueAction = true;
    }
  } else {
    console.log(
      `missing ${neededTokens} more tokens for bird. so ${
        neededTokens * 2
      } total`
    );
    if (foodCount.length === neededTokens * 2) {
      console.log("enough tokens to play bird");
      continueAction = true;
    }
  }
  return continueAction;
  //
};

export const eggReqCheck = (
  habitatBirdEggReq,
  location,
  setDisabledStates,
  totalEggCount,
  setResourceQuantity,
  setHabitat
) => {
  if (habitatBirdEggReq === 0) {
    console.log("Don't need any eggs to play bird in this space, good to go");
    setHabitat(location);
    setDisabledStates((draft) => ({
      ...draft,

      birdHand: false,
      habitats: true,
    }));
  } else if (habitatBirdEggReq === 1) {
    if (totalEggCount < 1) {
      console.log("not enough eggs to play this bird");
    } else {
      console.log("discard an egg please");
      setResourceQuantity(1);
      setDisabledStates((prev) => ({
        ...prev,
        playedBird: false,
        habitats: true,
      }));
    }
  } else if (habitatBirdEggReq === 2) {
    if (totalEggCount < 2) {
      console.log("not enough eggs to play this bird");
    } else {
      console.log("discard two eggs please");
      setResourceQuantity(2);
      setDisabledStates((prev) => ({
        ...prev,
        playedBird: false,
        habitats: true,
      }));
    }
  } else {
    console.log("Can't place any more birds in this habitat");
  }
};
