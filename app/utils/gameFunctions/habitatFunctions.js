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
