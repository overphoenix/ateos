export const createDate = (y, m, d, h, M, s, ms) => {
  //can't just apply() to create a date:
  //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
  const date = new Date(y, m, d, h, M, s, ms);

  //the date constructor remaps years 0-99 to 1900-1999
  if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
    date.setFullYear(y);
  }
  return date;
};

export const createUTCDate = (...args) => {
  const [y] = args;
  const date = new Date(Date.UTC(...args));
  //the Date.UTC function remaps years 0-99 to 1900-1999
  if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
    date.setUTCFullYear(y);
  }
  return date;
};
