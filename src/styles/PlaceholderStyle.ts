import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";

export const PlaceholderStyle = (styles: CSSInterpolation) => [
	css`
		&::placeholder {
			opacity: 1;
			${styles}
		}
	`,
];
