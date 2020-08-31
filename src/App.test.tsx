import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";

describe("getCards service", () => {
  const OLD_ENV = process.env;
  jest.mock("./service");
  // eslint-disable-next-line
  const getCards = require("./service").default;

  beforeEach(() => {
    jest.resetModules(); // clears the cache
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  test("Should have expected number of cards", () => {
    process.env = {
      ...OLD_ENV,
      REACT_APP_CARDS_COUNT: "20",
    };
    const { getAllByTestId } = render(<App />);
    const cardElements = getAllByTestId("card-container");
    expect(cardElements).toHaveLength(20);
  });

  test("WHEN click SHOULD not flip at start", () => {
    process.env = {
      ...OLD_ENV,
      REACT_APP_START_DELAY: "5000",
    };
    const { getAllByTestId } = render(<App />);
    const cardElements = getAllByTestId("card-container");
    const firstCard = cardElements[0];

    const innerContainer = firstCard.firstChild;

    // face-up at start
    expect(innerContainer).toHaveStyleRule("transform", "rotateY(0deg)");

    fireEvent(
      firstCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    // 5 secs delay before start
    expect(innerContainer).toHaveStyleRule("transform", "rotateY(0deg)");
  });

  test("WHEN click SHOULD flip after start", async () => {
    process.env = {
      ...OLD_ENV,
      REACT_APP_START_DELAY: "1",
    };
    const { getAllByTestId } = render(<App />);
    const cardElements = getAllByTestId("card-container");
    const firstCard = cardElements[0];

    const innerContainer = firstCard.firstChild;

    await waitFor(() =>
      expect(innerContainer).toHaveStyleRule("transform", "rotateY(180deg)")
    );

    fireEvent(
      firstCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(innerContainer).toHaveStyleRule("transform", "rotateY(0deg)");
  });

  test("WHEN click not matching SHOULD flip back after some time", async () => {
    process.env = {
      ...OLD_ENV,
      REACT_APP_DISPLAY_RESET: "1",
      REACT_APP_START_DELAY: "1",
    };
    getCards.mockImplementationOnce(() => [1, 2, 3, 1, 2, 3]);
    const { getAllByTestId } = render(<App />);
    const cardElements = getAllByTestId("card-container");
    const firstCard = cardElements[0];
    const secondCard = cardElements[1];

    const innerContainerFirst = firstCard.firstChild;
    const innerContainerSecond = secondCard.firstChild;

    await waitFor(() =>
      expect(innerContainerFirst).toHaveStyleRule(
        "transform",
        "rotateY(180deg)"
      )
    );

    fireEvent(
      firstCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    fireEvent(
      secondCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(innerContainerFirst).toHaveStyleRule("transform", "rotateY(0deg)");
    expect(innerContainerSecond).toHaveStyleRule("transform", "rotateY(0deg)");

    await waitFor(() =>
      expect(innerContainerFirst).toHaveStyleRule(
        "transform",
        "rotateY(180deg)"
      )
    );

    expect(innerContainerSecond).toHaveStyleRule(
      "transform",
      "rotateY(180deg)"
    );
  });

  test("WHEN click 3 not matching SHOULD flip back 2 first", async () => {
    process.env = {
      ...OLD_ENV,
      REACT_APP_DISPLAY_RESET: "1",
      REACT_APP_START_DELAY: "1",
    };
    getCards.mockImplementationOnce(() => [1, 2, 3, 1, 2, 3]);
    const { getAllByTestId } = render(<App />);
    const cardElements = getAllByTestId("card-container");
    const firstCard = cardElements[0];
    const secondCard = cardElements[1];
    const thirdCard = cardElements[2];

    const innerContainerFirst = firstCard.firstChild;
    const innerContainerSecond = secondCard.firstChild;
    const innerContainerThird = thirdCard.firstChild;

    await waitFor(() =>
      expect(innerContainerFirst).toHaveStyleRule(
        "transform",
        "rotateY(180deg)"
      )
    );

    fireEvent(
      firstCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() =>
      expect(innerContainerFirst).toHaveStyleRule("transform", "rotateY(0deg)")
    );

    fireEvent(
      secondCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() =>
      expect(innerContainerSecond).toHaveStyleRule("transform", "rotateY(0deg)")
    );

    expect(innerContainerThird).toHaveStyleRule("transform", "rotateY(180deg)");

    fireEvent(
      thirdCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() =>
      expect(innerContainerThird).toHaveStyleRule("transform", "rotateY(0deg)")
    );
    expect(innerContainerFirst).toHaveStyleRule("transform", "rotateY(180deg)");
    expect(innerContainerSecond).toHaveStyleRule(
      "transform",
      "rotateY(180deg)"
    );
  });

  test("WHEN click 3 and second and third are matching SHOULD flip back 2 first ", async () => {
    process.env = {
      ...OLD_ENV,
      REACT_APP_DISPLAY_RESET: "1",
      REACT_APP_START_DELAY: "1",
    };
    getCards.mockImplementationOnce(() => [1, 2, 3, 1, 2, 3]);
    const { getAllByTestId } = render(<App />);
    const cardElements = getAllByTestId("card-container");
    const firstCard = cardElements[1];
    const secondCard = cardElements[0];
    const thirdCard = cardElements[3]; // 0 and 3 are matching, both are equal to 1

    const innerContainerFirst = firstCard.firstChild;
    const innerContainerSecond = secondCard.firstChild;
    const innerContainerThird = thirdCard.firstChild;

    await waitFor(() =>
      expect(innerContainerFirst).toHaveStyleRule(
        "transform",
        "rotateY(180deg)"
      )
    );

    fireEvent(
      firstCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() =>
      expect(innerContainerFirst).toHaveStyleRule("transform", "rotateY(0deg)")
    );

    fireEvent(
      secondCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() =>
      expect(innerContainerSecond).toHaveStyleRule("transform", "rotateY(0deg)")
    );

    expect(innerContainerThird).toHaveStyleRule("transform", "rotateY(180deg)");

    fireEvent(
      thirdCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() =>
      expect(innerContainerThird).toHaveStyleRule("transform", "rotateY(0deg)")
    );
    expect(innerContainerFirst).toHaveStyleRule("transform", "rotateY(180deg)");
    expect(innerContainerSecond).toHaveStyleRule(
      "transform",
      "rotateY(180deg)"
    );
  });

  test("WHEN click 3 and first and second are matching SHOULD not flip back 2 first ", async () => {
    process.env = {
      ...OLD_ENV,
      REACT_APP_DISPLAY_RESET: "1",
      REACT_APP_START_DELAY: "1",
    };
    getCards.mockImplementationOnce(() => [1, 2, 3, 1, 2, 3]);
    const { getAllByTestId } = render(<App />);
    const cardElements = getAllByTestId("card-container");
    const firstCard = cardElements[0];
    const secondCard = cardElements[3]; // 0 and 3 are matching, both are equal to 1
    const thirdCard = cardElements[1];

    const innerContainerFirst = firstCard.firstChild;
    const innerContainerSecond = secondCard.firstChild;
    const innerContainerThird = thirdCard.firstChild;

    await waitFor(() =>
      expect(innerContainerFirst).toHaveStyleRule(
        "transform",
        "rotateY(180deg)"
      )
    );

    fireEvent(
      firstCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() =>
      expect(innerContainerFirst).toHaveStyleRule("transform", "rotateY(0deg)")
    );

    fireEvent(
      secondCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() =>
      expect(innerContainerSecond).toHaveStyleRule("transform", "rotateY(0deg)")
    );

    expect(innerContainerThird).toHaveStyleRule("transform", "rotateY(180deg)");

    fireEvent(
      thirdCard,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() =>
      expect(innerContainerThird).toHaveStyleRule("transform", "rotateY(0deg)")
    );
    expect(innerContainerFirst).toHaveStyleRule("transform", "rotateY(0deg)");
    expect(innerContainerSecond).toHaveStyleRule("transform", "rotateY(0deg)");
  });
});
