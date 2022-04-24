import { css } from "@emotion/react";
import { Color, theme } from "./ColorStyle";

export const ShadowStyle = ({ box }: { box?: boolean } = {}) => [
  css`
    box-shadow: 0px 4px 4px -3px ${theme[Color.Border]};
  `,
  box &&
    css`
      box-shadow: 0px 3px 6px 0px ${theme[Color.Border]};
    `,
];
