import { observable } from "mobx";
import { createContext, useContext } from "react";
import { UserState } from "./UserState";

export const appStateContext = createContext<AppState | null>(null);

export const useAppState = () => {
  const appState = useContext(appStateContext);
  if (appState === null) throw new Error();
  return appState;
};

export class AppState {
  @observable user: string | null = null;
}
