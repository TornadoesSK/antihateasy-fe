import { css } from "@emotion/react";
import { transparentize } from "polished";

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
	PrimaryAlt,
	PrimaryLight,
	Primary20,
	White,
	Base,
	Muted,
	Light,
	White70,
}

export const theme: Record<Color, string> = {
	[Color.Primary]: "#033F63",
	[Color.PrimaryAlt]: "#336380",
	[Color.PrimaryLight]: "#033F63",
	[Color.Primary20]: transparentize(0.8, "#033F63"),
	[Color.Base]: "#F3F3F3",
	[Color.White]: "#FFFFFF",
	[Color.Muted]: "#7E7E7E",
	[Color.Light]: "#0003",
	[Color.White70]: transparentize(0.3, "#FFFFFF"),
};
