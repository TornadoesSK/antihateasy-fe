import { css } from "@emotion/react";

type SizeStyleProps = {
	w?: number;
	h?: number;
	a?: number;
	wPct?: number;
	hPct?: number;
	aPct?: number;
};

export const SizeStyle = ({ w, h, a, wPct, hPct, aPct }: SizeStyleProps = {}) => {
	return css`
		${w !== undefined &&
		css`
			width: ${w}px;
		`}
		${wPct !== undefined &&
		css`
			width: ${wPct}%;
		`}
		${h !== undefined &&
		css`
			height: ${h}px;
		`}
		${hPct !== undefined &&
		css`
			height: ${hPct}%;
		`}
		${a !== undefined &&
		css`
			width: ${a}px;
			height: ${a}px;
		`}
		${aPct !== undefined &&
		css`
			width: ${aPct}%;
			height: ${aPct}%;
		`}
	`;
};
