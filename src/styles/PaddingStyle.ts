import { css } from "@emotion/react";

type DirectionalSizeStyleProps = {
	a?: number; // all
	v?: number; // vertical
	h?: number; // horizontal
	t?: number; // top
	b?: number; // bottom
	l?: number; // left
	r?: number; // right
};

export const PaddingStyle = ({ a, v, h, t, b, l, r }: DirectionalSizeStyleProps = {}) => {
	return css`
		${a !== undefined && `padding: ${a}px;`}
		${v !== undefined &&
		`
			padding-top: ${v}px;
			padding-bottom: ${v}px;
		`}
		${h !== undefined &&
		`
			padding-left: ${h}px;
			padding-right: ${h}px;
		`}
		${t !== undefined && `padding-top: ${t}px;`}
		${b !== undefined && `padding-bottom: ${b}px;`}
		${l !== undefined && `padding-left: ${l}px;`}
		${r !== undefined && `padding-right: ${r}px;`}
	`;
};

export const MarginStyle = ({ a, v, h, t, b, l, r }: DirectionalSizeStyleProps = {}) => {
	return css`
		${a !== undefined && `margin: ${a}px;`}
		${v !== undefined &&
		`
			margin-top: ${v}px;
			margin-bottom: ${v}px;
		`}
		${h !== undefined &&
		`
			margin-left: ${h}px;
			margin-right: ${h}px;
		`}
		${t !== undefined && `margin-top: ${t}px;`}
		${b !== undefined && `margin-bottom: ${b}px;`}
		${l !== undefined && `margin-left: ${l}px;`}
		${r !== undefined && `margin-right: ${r}px;`}
	`;
};
