import styled, { CreateStyled } from "@emotion/styled/macro";
import type ThemeType from "./type";

export type Theme = {
  theme: ThemeType;
};
export default styled as CreateStyled<ThemeType>;
