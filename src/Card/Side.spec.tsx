import React from "react";
import { render } from "@testing-library/react";
import Side from "./Side";

describe("Side component", () => {
  test("renders Side with correct image and alt", () => {
    const image = "some.jpg";
    const alt = "image";
    const { getByAltText } = render(<Side image={image} alt={alt} face />);
    const imageElement = getByAltText(new RegExp(alt, "i"));
    expect(imageElement).toHaveAttribute("src", image);
    expect(imageElement).toBeInTheDocument();
  });

  test("renders Side-Front with 0deg rotation", () => {
    const image = "some.jpg";
    const alt = "image";
    const { getByTestId } = render(<Side image={image} alt={alt} face />);
    const containerElement = getByTestId("card-side-container");
    expect(containerElement).toHaveStyleRule("transform", "rotateY(0deg)");
  });

  test("renders Side-Back with 180deg rotation", () => {
    const image = "some.jpg";
    const alt = "image";
    const { getByTestId } = render(
      <Side image={image} alt={alt} face={false} />
    );
    const containerElement = getByTestId("card-side-container");
    expect(containerElement).toHaveStyleRule("transform", "rotateY(180deg)");
  });
});
