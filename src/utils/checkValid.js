const isValidFile = (fileName, types) => {
  const fileType = fileName.split('.').pop().toLowerCase();
  return types.includes(fileType);
};

const isValidUrl = (checkUrl) => {
  let url;

  try {
    url = new URL(checkUrl);
  } catch (error) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

const checkValidNumber = (string) => {
  const numberRegex = new RegExp(/^\d+(\.\d)?\d*$/);
  return numberRegex.test(string);
};

export { isValidFile, isValidUrl, checkValidNumber };
