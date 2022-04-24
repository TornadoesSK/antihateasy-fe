import { css } from "@emotion/react";
import { Color, theme } from "./ColorStyle";
import { FocusStyle, HoverStyle } from "./HoverStyle";
import { PaddingStyle } from "./PaddingStyle";
import { RoundedStyle } from "./RoundedStyle";
import { ShadowStyle } from "./ShadowStyle";

export const InputStyle = ({ error }: { error?: boolean } = {}) => [
  PaddingStyle({ v: 8, h: 16 }),
  RoundedStyle({ a: 4 }),
  ShadowStyle(),
  HoverStyle(css`
    outline-color: ${theme[error ? Color.Danger : Color.BorderDark20]};
  `),
  FocusStyle(css`
    outline-color: ${theme[error ? Color.Danger : Color.BorderDark40]};
  `),
  css`
    outline-width: 1px;
    outline-style: solid;
    outline-color: ${theme[error ? Color.Danger : Color.Border]};
    transition: outline-color 0.08s;
  `,
];
