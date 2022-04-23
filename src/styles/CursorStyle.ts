import { css } from "@emotion/react";

type CursorStyleProps = {
	pointer?: boolean;
	notAllowed?: boolean;
	text?: boolean;
	arrowH?: boolean;
	arrowV?: boolean;
};
export const CursorStyle = ({
	pointer,
	notAllowed,
	text,
	arrowH,
	arrowV,
}: CursorStyleProps = {}) => {
	return css`
		${pointer &&
		css`
			cursor: pointer;
		`}
		${notAllowed &&
		css`
			cursor: not-allowed;
		`}
		${text &&
		css`
			cursor: text;
		`}
		${arrowH &&
		css`
			cursor: ew-resize;
		`}
		${arrowV &&
		css`
			cursor: ns-resize;
		`}
	`;
};
