import React from "react";
import { render } from "@testing-library/react";
import Side from "./Side";

test("renders Side with correct image and alt", () => {
  const image = "some.jpg";
  const alt = "image";
  const { getByAltText } = render(<Side image={image} alt={alt} face />);
  const imageElement = getByAltText(new RegExp(alt, "i"));
  expect(imageElement).toHaveAttribute("src", image);
  expect(imageElement).toBeInTheDocument();
});
