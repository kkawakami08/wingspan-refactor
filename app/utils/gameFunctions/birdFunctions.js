export const refillTray = (birdTray, birdDeck, setBirdDeck, setBirdTray) => {
  let initialDeck = birdDeck;
  let newTray = [];
  for (let i = birdTray.length; i < 3; i++) {
    newTray.push(initialDeck.pop());
  }
  setBirdTray((prev) => [...prev, ...newTray]);
  setBirdDeck(initialDeck);
};
