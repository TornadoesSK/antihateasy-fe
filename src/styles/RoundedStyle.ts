import { css } from "@emotion/react";

type RoundedStyleProps = {
	a?: number;
	l?: number;
	r?: number;
	t?: number;
	b?: number;
	tl?: number;
	tr?: number;
	bl?: number;
	br?: number;
	aPct?: number;
	lPct?: number;
	rPct?: number;
	tPct?: number;
	bPct?: number;
	tlPct?: number;
	trPct?: number;
	blPct?: number;
	brPct?: number;
};

export const RoundedStyle = ({
	a,
	l,
	r,
	t,
	b,
	tl,
	tr,
	bl,
	br,
	aPct,
	lPct,
	rPct,
	tPct,
	bPct,
	tlPct,
	trPct,
	blPct,
	brPct,
}: RoundedStyleProps = {}) => {
	return css`
		${a !== undefined &&
		css`
			border-radius: ${a}px;
		`}
		${l !== undefined &&
		css`
			border-top-left-radius: ${l}px;
			border-bottom-left-radius: ${l}px;
		`}
		${r !== undefined &&
		css`
			border-top-right-radius: ${r}px;
			border-bottom-right-radius: ${r}px;
		`}
		${t !== undefined &&
		css`
			border-top-left-radius: ${t}px;
			border-top-right-radius: ${t}px;
		`}
		${b !== undefined &&
		css`
			border-bottom-left-radius: ${b}px;
			border-bottom-right-radius: ${b}px;
		`}
		${tl !== undefined &&
		css`
			border-top-left-radius: ${tl}px;
		`}
		${tr !== undefined &&
		css`
			border-top-right-radius: ${tr}px;
		`}
		${bl !== undefined &&
		css`
			border-bottom-left-radius: ${bl}px;
		`}
		${br !== undefined &&
		css`
			border-bottom-right-radius: ${br}px;
		`}
		${aPct !== undefined &&
		css`
			border-radius: ${aPct}%;
		`}
		${lPct !== undefined &&
		css`
			border-top-left-radius: ${lPct}%;
			border-bottom-left-radius: ${lPct}%;
		`}
		${rPct !== undefined &&
		css`
			border-top-right-radius: ${rPct}%;
			border-bottom-right-radius: ${rPct}%;
		`}
		${tPct !== undefined &&
		css`
			border-top-left-radius: ${tPct}%;
			border-top-right-radius: ${tPct}%;
		`}
		${bPct !== undefined &&
		css`
			border-bottom-left-radius: ${bPct}%;
			border-bottom-right-radius: ${bPct}%;
		`}
		${tlPct !== undefined &&
		css`
			border-top-left-radius: ${tlPct}%;
		`}
		${trPct !== undefined &&
		css`
			border-top-right-radius: ${trPct}%;
		`}
		${blPct !== undefined &&
		css`
			border-bottom-left-radius: ${blPct}%;
		`}
		${brPct !== undefined &&
		css`
			border-bottom-right-radius: ${brPct}%;
		`}
	`;
};
