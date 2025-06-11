const haveCommonElement = (arr1: string[], arr2: string[]): boolean => {
  const set1 = new Set(arr1);

  for (const item of arr2) {
    if (set1.has(item)) {
      return true;
    }
  }

  return false;
};

export default haveCommonElement;
