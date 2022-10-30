const capitalizeWords = str => {
  if (!str) return null;
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
};

const isEmptyString = str => {
  return str?.length === 0;
};

export { capitalizeWords, isEmptyString };
