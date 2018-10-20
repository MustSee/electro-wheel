export function randomNumber (max) {
  return Math.floor(Math.random() * max);
}

export function findNewIndex (lastIndex, length) {
  let newIndex = randomNumber(length);
  while (newIndex === lastIndex) {
    newIndex = randomNumber(length);
  }
  return newIndex;
}

