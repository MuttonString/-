export const sumObjValues = (obj: {
  [key: string]: number[];
}): { [key: string]: number } => {
  const result: { [key: string]: number } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const array = obj[key];
      result[key] = array.reduce((acc, curr) => acc + curr, 0);
    }
  }
  return result;
};
