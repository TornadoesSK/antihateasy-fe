import { css } from "@emotion/react";
import { Color, theme } from "./ColorStyle";

type TextStyleProps = {
	bold?: boolean;
	normal?: boolean;
	subtitle?: boolean;
	muted?: boolean;
	semiBold?: boolean;
	white?: boolean;
	primary?: boolean;
};

export const TextStyle = ({
	bold,
	normal,
	subtitle,
	muted,
	semiBold,
	white,
	primary,
}: TextStyleProps = {}) => {
	return css`
		${normal &&
		css`
			font-weight: 400;
		`}
		${bold &&
		css`
			font-weight: 700;
		`}
		${semiBold &&
		css`
			font-weight: 600;
		`}
		${subtitle &&
		css`
			font-size: 12px;
		`}
		color: black;
		${muted &&
		css`
			color: ${theme[Color.Muted]};
		`}
		${white &&
		css`
			color: ${theme[Color.White]};
		`}
		${primary &&
		css`
			color: ${theme[Color.Primary]};
		`}
	`;
};
