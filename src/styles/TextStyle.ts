import { css } from "@emotion/react";
import { Color, theme } from "./ColorStyle";

type TextStyleProps = {
  bold?: boolean;
  normal?: boolean;
  medium?: boolean;
};

export const TextStyle = ({ bold, normal, medium }: TextStyleProps = {}) => {
  return css`
    ${normal &&
    css`
      font-weight: 400;
    `}
    ${medium &&
    css`
      font-weight: 500;
    `}
		${bold &&
    css`
      font-weight: 700;
    `}
  `;
};
