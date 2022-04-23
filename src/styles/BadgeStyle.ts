import { css } from "@emotion/react";
import { Color, theme } from "./ColorStyle";
import { PaddingStyle, RoundedStyle, TextStyle } from "./Styles";

type BadgeStyleProps = {
	large?: boolean;
	primary?: boolean;
	secondary?: boolean;
};

export const BadgeStyle = ({ large, primary, secondary }: BadgeStyleProps = {}) => [
	RoundedStyle({ a: large ? 10 : 4 }),
	TextStyle({ subtitle: true, muted: true }),
	PaddingStyle({ v: 2, h: large ? 8 : 4 }),
	css`
		border: 1px solid;
		border-color: ${theme[Color.Muted]};
	`,
	primary &&
		css`
			background-color: ${theme[Color.Primary20]};
			border-color: ${theme[Color.Primary20]};
		`,
	secondary &&
		css`
			background-color: ${theme[Color.Light]};
			border-color: ${theme[Color.Light]};
		`,
];
