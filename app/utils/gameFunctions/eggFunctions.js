// habitat[i] = {
//   action: {
//     type: resource,
//     quantity: startingQuantity,
//     discard: "none",
//   },
//   bird: null,
//   eggCount: 0,
//   cacheCount: 0,
//   tuckedCount: 0,
// };

import {
  initialDisableSelectionState,
  initialDisabledStates,
} from "../../data/initialData";

export const layEgg = (setHabitat, space, setResourceQuantity) => {
  //update forest[space].eggCount ++
  setHabitat((prev) => ({
    ...prev,
    [space]: {
      ...prev[space],
      eggCount: prev[space].eggCount + 1,
    },
  }));
  setResourceQuantity((prev) => prev - 1);
};

export const resetGrassland = ({
  setCurrentAction,

  setDisabledStates,
  setDisableSelection,
  setResourceQuantity,
}) => {
  setCurrentAction("");

  setDisabledStates(initialDisabledStates);
  setDisableSelection(initialDisableSelectionState);
  setResourceQuantity(0);
};
