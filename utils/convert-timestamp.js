exports.formatTimestamp = (data, keyToChange) => {
  if (data.length < 1 || keyToChange === undefined) return [...data];
  data.map(eachObj => {
    const time = new Date(eachObj[keyToChange]);
    eachObj[keyToChange] = time;
  });
  return data;
};
