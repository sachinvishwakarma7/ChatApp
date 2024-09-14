const isObject = (value: object) => {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length >= 0
  );
};

const getObjectLength = (obj: object) => {
  if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.keys(obj).length;
  }
  return 0;
};

export {isObject, getObjectLength};
