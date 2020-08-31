import React from "react";
import { render, screen, getAllByTestId } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const cardElements = screen.getAllByTestId("card-container");
  expect(cardElements.length).toBeGreaterThanOrEqual(1);
});
