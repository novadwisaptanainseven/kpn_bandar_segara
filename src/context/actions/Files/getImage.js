const getImage = (path, filename) => {
  return `${localStorage.baseUrlImg}${path}/${filename}`;
};

export default getImage;
