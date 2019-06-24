exports.formatTimestamp = (data, keyToChange) => {
  if (data.length < 1 || keyToChange === undefined) return [...data];
  return data.map(eachObj => {
    const time = new Date(eachObj[keyToChange]);
    return { ...eachObj, [keyToChange]: time };
  });
};
