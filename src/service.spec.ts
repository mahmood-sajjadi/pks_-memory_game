import getCards from "./service";

describe("getCards service", () => {
  test("should return expected number of elements", () => {
    expect(getCards(4)).toHaveLength(4);
    expect(getCards(8)).toHaveLength(8);
    expect(getCards(10)).toHaveLength(10);
    expect(getCards(50)).toHaveLength(50);
    expect(getCards(100)).toHaveLength(100);
  });

  test("should throw error for number of cards less than 2", () => {
    expect(() => getCards(-4)).toThrowError();
    expect(() => getCards(0)).toThrowError();
    expect(() => getCards(1)).toThrowError();
  });

  test("should throw error for number of cards is odd", () => {
    expect(() => getCards(3)).toThrowError();
    expect(() => getCards(5)).toThrowError();
    expect(() => getCards(91)).toThrowError();
  });

  test("should throw error for number of cards higher than 104", () => {
    expect(() => getCards(105)).toThrowError();
    expect(() => getCards(106)).toThrowError();
    expect(() => getCards(130)).toThrowError();
  });

  test("should have 2 of each card", () => {
    const cards = getCards(104);
    for (let i = 0; i < cards.length; i += 1) {
      expect(
        cards.filter((c, index) => index !== i && c === cards[i])
      ).toHaveLength(1);
    }
  });

  test("cards should be integer from 1 to 52", () => {
    const cards = getCards(104);
    expect(cards.filter((c) => c % 1 !== 0 || c < 1 || c > 52)).toHaveLength(0);
  });
});
