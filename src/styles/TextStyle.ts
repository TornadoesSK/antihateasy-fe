import { css } from "@emotion/react";
import { Color, theme } from "./ColorStyle";

type TextStyleProps = {
  bold?: boolean;
  normal?: boolean;
  medium?: boolean;
  danger?: boolean;
  small?: boolean;
  large?: boolean;
  veryLarge?: boolean;
};

export const TextStyle = ({
  bold,
  normal,
  medium,
  danger,
  small,
  large,
  veryLarge,
}: TextStyleProps = {}) => {
  return css`
    font-size: 14px;
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
	${danger &&
    css`
      color: ${theme[Color.Danger]};
    `}
	${large &&
    css`
      font-size: 18px;
    `}
	${small &&
    css`
      font-size: 12px;
    `}
	${veryLarge &&
    css`
      font-size: 22px;
    `}
  `;
};
