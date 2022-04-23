import { useRef } from "react";

export function useStore<T, U>(Class: { new(args: U): T; }, args: U) {
	let ref = useRef<T>();
	if (!ref.current) {
		ref.current = new Class(args)
	}
	return ref.current;
}
