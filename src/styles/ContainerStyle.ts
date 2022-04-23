import { css } from "@emotion/react";

type ContainerStyleProps = {
	direction?: "column" | "row" | "row-reverse" | "column-reverse";
	justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
	alignItems?: "flex-start" | "flex-end" | "center";
};

export const ContainerStyle = ({
	direction = "row",
	justifyContent,
	alignItems,
}: ContainerStyleProps = {}) => {
	return css`
		display: flex;
		flex-direction: ${direction};
		${justifyContent &&
		css`
			justify-content: ${justifyContent};
		`}
		${alignItems &&
		css`
			align-items: ${alignItems};
		`}
	`;
};

type ItemStyleProps = {
	grow?: number;
	shrink?: number;
	basisPct?: number;
};

export const ItemStyle = ({ grow = 0, shrink = 0, basisPct }: ItemStyleProps = {}) => {
	return css`
		flex-grow: ${grow};
		flex-shrink: ${shrink};
		${basisPct !== undefined &&
		css`
			flex-basis: ${basisPct}%;
		`}
	`;
};
