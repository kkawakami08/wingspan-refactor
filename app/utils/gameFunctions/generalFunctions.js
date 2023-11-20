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
