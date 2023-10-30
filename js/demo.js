if (arr.length === 0) {
  return null;
}

let highest = {
  value: arr[0],
  index: 0,
};
let lowest = {
  value: arr[0],
  index: 0,
};

for (let i = 1; i < arr.length; i++) {
  if (arr[i] > highest.value) {
    highest.value = arr[i];
    highest.index = i;
  }
  if (arr[i] < lowest.value) {
    lowest.value = arr[i];
    lowest.index = i;
  }
}

return { highest, lowest };
