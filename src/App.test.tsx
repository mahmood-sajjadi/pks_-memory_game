import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("getCards service", () => {
  const OLD_ENV = process.env;

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
});
