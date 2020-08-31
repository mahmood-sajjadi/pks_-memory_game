const getCards = (count: number): number[] => {
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
