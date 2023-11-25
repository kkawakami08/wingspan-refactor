import {
  initialDisableSelectionState,
  initialDisabledStates,
} from "../../data/initialData";

export const saveSelection = (setDestination, setSelection, selection) => {
  setDestination((prev) => [...prev, ...selection]);

  setSelection([]);
};
export const drawCard = (mainDeck, setHand, setDeck) => {
  const deck = mainDeck;
  console.log("mainDeck length", mainDeck.length);
  const card = deck.pop();
  console.log("draw this card", card);
  setHand((prev) => [...prev, card]);

  setDeck(deck);
  console.log("mainDeck new length", mainDeck.length);
};

export const resetStates = ({
  setSelectedBirds,
  setSelectedFood,
  setDisableSelection,
  setDisabledStates,
  setCurrentAction,
  setResourceQuantity,
  setBirdFoodReq,
  setSelectedHabitat,
}) => {
  setSelectedFood([]);
  setSelectedBirds([]);
  setDisableSelection(initialDisableSelectionState);
  setDisabledStates(initialDisabledStates);
  setCurrentAction("");
  setResourceQuantity(0);
  setBirdFoodReq({});
  setSelectedHabitat("");
};

export const cardSelection = (
  source,
  key,
  value,
  setDestination,
  setSource
) => {
  const initialHand = source;
  const selectedCardIndex = initialHand.map((card) => card[key]).indexOf(value);
  const [selectedCard] = initialHand.splice(selectedCardIndex, 1);

  setDestination((prev) => [...prev, selectedCard]);
  setSource((prev) => [...initialHand]);
};
