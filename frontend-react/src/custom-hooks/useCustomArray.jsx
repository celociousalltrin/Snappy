const useCustomArray = (input) => {
  const createCustomArray = (number) => {
    let customArray = [];
    for (let i = 1; i <= number; i++) {
      customArray.push(i);
    }
    return customArray;
  };
  return createCustomArray(input);
};

export default useCustomArray;
