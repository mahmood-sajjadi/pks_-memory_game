import React from "react";
import styled, { Theme } from "theme/styled";
import defaultTheme from "theme/default";
import Side from "./Side";

interface Props {
  face: string;
  back: string;
  alt: string;
  faceTop: boolean;
  onClick?: React.DOMAttributes<HTMLDivElement>["onClick"];
}

const Container = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  perspective: 500px;
`;

const Inner = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: ${(props: Theme) => {
    return `transform ${
      (props.theme.animation ? props.theme.animation : defaultTheme.animation)
        .normal
    }s`;
  }};
  transform-style: preserve-3d;
  transform: ${(props: Pick<Props, "faceTop"> & Theme) =>
    props.faceTop ? "rotateY(0deg)" : "rotateY(180deg)"};
`;

const Card: React.FC<Props> = (props) => {
  const { face, back, alt, faceTop, onClick } = props;
  return (
    <Container onClick={onClick} data-testid="card-container">
      <Inner faceTop={faceTop} data-testid="card-inner-container">
        <Side image={face} alt={alt} face />
        <Side image={back} alt={alt} face={false} />
      </Inner>
    </Container>
  );
};

export default Card;
