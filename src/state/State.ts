import { useRef } from "react";

export function useStore<State>(Class: {
  new (_args: undefined): State;
}): State;
export function useStore<Args, State>(
  Class: { new (_args: Args): State },
  args: Args
): State;
export function useStore<Args, State>(
  Class: { new (_args: Args | undefined): State },
  args?: Args
): State {
  const ref = useRef<State>();
  if (!ref.current) {
    ref.current = new Class(args);
  }
  return ref.current;
}

export abstract class State<Args = undefined> {
  constructor(protected args: Args) {
    this.args = args;
  }
}
