import { observer } from "mobx-react";
import { AppState, appStateContext } from "./AppState";
import { LoginScreen } from "./LoginScreen";
import { useStore } from "./State";
import { Feed } from "./Feed";

export const App = observer(() => {
  const appState = useStore(AppState);
  return (
    <>
      <appStateContext.Provider value={appState}>
        {appState.user ? <Feed /> : <LoginScreen />}
      </appStateContext.Provider>
    </>
  );
});
