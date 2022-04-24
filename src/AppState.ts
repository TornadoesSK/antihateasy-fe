import { action, computed, observable } from "mobx";
import { createContext, useContext } from "react";

export const appStateContext = createContext<AppState | null>(null);

export const useAppState = () => {
  const appState = useContext(appStateContext);
  if (appState === null) throw new Error();
  return appState;
};

type User = {
  id: number;
  username: string;
};

export class AppState {
  constructor() {
    const user = localStorage.getItem("user");
    this._user = user === null ? null : JSON.parse(user);
  }
  @observable _user: User | null;
  @computed get user() {
    return this._user;
  }
  set user(value) {
    this._user = value;
    if (value) {
      localStorage.setItem("user", JSON.stringify(value));
    } else {
      localStorage.removeItem("user");
    }
  }
}
