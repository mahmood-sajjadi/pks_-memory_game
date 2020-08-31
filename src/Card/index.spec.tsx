import React from "react";
import { render } from "@testing-library/react";
import Card from ".";

test("renders Card with two Sides", () => {
  const face = "face.jpg";
  const back = "back.jpg";
  const alt = "image";
  const { getAllByAltText } = render(
    <Card face={face} back={back} alt={alt} faceTop />
  );
  const imageElements = getAllByAltText(new RegExp(alt, "i"));
  expect(imageElements).toHaveLength(2);
  // expect(imageElements).toBeInTheDocument();
});
