import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";

export const HoverStyle = (styles: CSSInterpolation) => {
	return css`
		&:hover {
			${styles}
		}
	`;
};

export const FocusStyle = (styles: CSSInterpolation) => {
	return css`
		&:focus {
			${styles}
		}
	`;
};

export const ActiveStyle = (styles: CSSInterpolation) => {
	return css`
		&:active {
			${styles}
		}
	`;
};
