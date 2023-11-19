export const saveSelection = (setPlayer, setSelection, selection) => {
  setPlayer((prev) => [...prev, ...selection]);

  setSelection([]);
};
