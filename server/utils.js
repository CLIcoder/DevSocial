export const likeFunc = (arr, id) => {
  // like and dislike function
  for (let elem in arr) {
    // update user like
    if (arr[elem].id === id) {
      arr[elem].status = !arr[elem].status;
      return arr;
    }
  }
  // merge new user like
  arr.push({ id, status: true });
  return arr;
};

export const countLikes = (arr) => {
  let counter = 0;
  for (let elem in arr) {
    if (arr[elem].status) counter++;
  }
  return counter;
};
