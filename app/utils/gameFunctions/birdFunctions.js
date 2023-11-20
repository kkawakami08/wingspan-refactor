export const cardSelection = (
  source,
  key,
  value,
  setDestination,
  setSource
) => {
  console.log("source", source);
  const initialHand = source;
  const selectedCardIndex = initialHand.map((card) => card[key]).indexOf(value);
  const [selectedCard] = initialHand.splice(selectedCardIndex, 1);
  console.log("selected bird", selectedCard);

  setDestination((prev) => [...prev, selectedCard]);
  setSource((prev) => [...initialHand]);
};

export const refillTray = (birdTray, birdDeck, setBirdDeck, setBirdTray) => {
  let initialDeck = birdDeck;
  let newTray = [];
  for (let i = birdTray.length; i < 3; i++) {
    newTray.push(initialDeck.pop());
  }
  setBirdTray((prev) => [...prev, ...newTray]);
  setBirdDeck(initialDeck);
};
