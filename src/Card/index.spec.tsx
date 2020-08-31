import React from "react";
import { render } from "@testing-library/react";
import Card from ".";

describe("Card component", () => {
  test("renders Card with two Sides", () => {
    const face = "face.jpg";
    const back = "back.jpg";
    const alt = "image";
    const { getAllByAltText } = render(
      <Card face={face} back={back} alt={alt} faceTop />
    );
    const imageElements = getAllByAltText(new RegExp(alt, "i"));
    expect(imageElements).toHaveLength(2);
    expect(imageElements[0]).toBeInTheDocument();
    expect(imageElements[1]).toBeInTheDocument();
  });

  test("renders Card-FaceTop with 0deg rotation", () => {
    const face = "face.jpg";
    const back = "back.jpg";
    const alt = "image";
    const { getByTestId } = render(
      <Card face={face} back={back} alt={alt} faceTop />
    );
    const innerContainer = getByTestId("card-inner-container");
    expect(innerContainer).toHaveStyleRule("transform", "rotateY(0deg)");
  });

  test("renders Card-FaceDown with 180deg rotation", () => {
    const face = "face.jpg";
    const back = "back.jpg";
    const alt = "image";
    const { getByTestId } = render(
      <Card face={face} back={back} alt={alt} faceTop={false} />
    );
    const innerContainer = getByTestId("card-inner-container");
    expect(innerContainer).toHaveStyleRule("transform", "rotateY(180deg)");
  });
});
