export const likeStatus = (arr, id) => {
  for (let elem in arr) {
    if (arr[elem].id === id && arr[elem].status) return "blue";
    if (arr[elem].id === id && !arr[elem].status) return "gray";
  }
  return "gray";
};
