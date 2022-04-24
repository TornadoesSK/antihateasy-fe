import { css } from "@emotion/react";
import { BackgroundColorStyle, Color, ColorStyle, theme } from "./ColorStyle";
import { ActiveStyle, HoverStyle } from "./HoverStyle";
import { PaddingStyle } from "./PaddingStyle";
import { RoundedStyle } from "./RoundedStyle";
import { ShadowStyle } from "./ShadowStyle";
import { TextStyle } from "./TextStyle";

export const ButtonStyle = ({
  primary,
  small,
}: { primary?: boolean; small?: boolean } = {}) => [
  PaddingStyle({ v: 10, h: 30 }),
  small && PaddingStyle({ v: 6, h: 20 }),
  RoundedStyle({ a: 4 }),
  BackgroundColorStyle(Color.White),
  ColorStyle(Color.Black),
  HoverStyle(BackgroundColorStyle(Color.White10)),
  ActiveStyle(BackgroundColorStyle(Color.White20)),
  !primary && [
    css`
      outline: 1px solid ${theme[Color.BorderLight40]};
    `,
  ],
  primary && [
    BackgroundColorStyle(Color.Primary),
    ColorStyle(Color.White),
    HoverStyle(BackgroundColorStyle(Color.PrimaryLight10)),
    ActiveStyle(BackgroundColorStyle(Color.PrimaryDark10)),
  ],
  ShadowStyle(),
  TextStyle(),
  css`
    transition: background-color 0.08s;
  `,
];
