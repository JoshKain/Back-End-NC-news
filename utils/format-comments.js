exports.formatBelongToKey = (commentsData, keyToChange, newKey) => {
  if (!keyToChange) return [...commentsData];
  return commentsData.map(comments => {
    const value = { [newKey]: comments[keyToChange], ...comments };
    delete value[keyToChange];
    return value;
  });
};

exports.createRef = (arrOfObj, keyToGetValue, keyToValue) => {
  if (!arrOfObj.length || !keyToGetValue || !keyToValue) return [...arrOfObj];
  return arrOfObj.map(eachObj => {
    let value = eachObj[keyToGetValue];
    return { [value]: eachObj[keyToValue] };
  });
};

exports.formatData = (dataArr, refArr) => {
  if (dataArr.length < 1 || refArr.length < 1) {
    return dataArr;
  }
  return dataArr.map(eachChar => {
    let x = refArr.find(eachRef => {
      return Object.keys(eachRef)[0] === eachChar.belongs_to;
    });
    eachChar.belongs_to = x[eachChar.belongs_to];
    const { article_id, ...rest } = eachChar;
    return eachChar;
  });
};
