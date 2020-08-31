import React from "react";
import styled, { Theme } from "theme/styled";

interface Props {
  image: string;
  alt: string;
  face: boolean;
}

const SideContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: ${(props: Pick<Props, "face"> & Theme) =>
    props.face ? "rotateY(0deg)" : "rotateY(180deg)"};
`;

const SideImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Side: React.FC<Props> = (props) => {
  const { image, alt, face } = props;
  return (
    <SideContainer face={face} data-testid="card-side-container">
      <SideImage src={image} alt={alt} />
    </SideContainer>
  );
};

export default Side;
