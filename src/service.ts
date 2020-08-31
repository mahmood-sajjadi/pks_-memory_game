const getCards = (count: number): number[] => {
  if (count < 2 || count > 104 || count % 2 !== 0) {
    throw new Error(
      `Invalid number of cards requested (${count}). Number of cards should be even and higher than 2/ less than 104`
    );
  }
  const result: number[] = Array(count);
  const cards: number[] = [];
  // select cards
  do {
    const card = Math.floor(Math.random() * 52) + 1;
    if (!cards.some((c) => c === card)) {
      cards.push(card);
    }
  } while (cards.length < count / 2);
  // put cards in  array
  for (let i = 0; i < cards.length; i += 1) {
    let inserted: 0 | 1 | 2 = 0;
    do {
      const position = Math.floor(Math.random() * count);
      if (!result[position]) {
        result[position] = cards[i];
        inserted += 1;
      }
    } while (inserted < 2);
  }
  return result;
};

export default getCards;
