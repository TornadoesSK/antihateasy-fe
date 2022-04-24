import { css } from "@emotion/react";

export const ColorStyle = (color: Color) => {
  return css`
    color: ${theme[color]};
  `;
};

export const BackgroundColorStyle = (color: Color) => {
  return css`
    background-color: ${theme[color]};
  `;
};

export enum Color {
  Primary,
  PrimaryDark10,
  PrimaryLight10,
  PrimaryLight80,
  PrimaryLight90,
  Border,
  BorderLight40,
  BorderDark20,
  BorderDark40,
  Secondary,
  Danger,
  White,
  White10,
  White20,
  Black,
}

export const theme: Record<Color, string> = {
  [Color.Primary]: "#8D2EA3",
  [Color.PrimaryDark10]: "#7f2993",
  [Color.PrimaryLight10]: "#9843ac",
  [Color.PrimaryLight80]: "#e8d5ed",
  [Color.PrimaryLight90]: "#f4eaf6",
  [Color.Secondary]: "#F0C659",
  [Color.Danger]: "red",
  [Color.Border]: "#aaaaaa",
  [Color.BorderLight40]: "#c4c4c4",
  [Color.BorderDark20]: "#888888",
  [Color.BorderDark40]: "#666666",
  [Color.White]: "#ffffff",
  [Color.White10]: "#e6e6e6",
  [Color.White20]: "#cccccc",
  [Color.Black]: "#000000",
};
