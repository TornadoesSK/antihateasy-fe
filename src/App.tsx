import { observer } from "mobx-react";
import { AppState, appStateContext } from "./AppState";
import { LoginScreen } from "./screens/LoginScreen";
import { useStore } from "./state/State";
import { MainScreen } from "./screens/MainScreen";
import { Global } from "@emotion/react";
import { ResetStyle } from "./styles/ResetStyle";

export const App = observer(() => {
  const appState = useStore(AppState);
  return (
    <>
      <appStateContext.Provider value={appState}>
        <Global styles={ResetStyle()} />
        {appState.user ? <MainScreen /> : <LoginScreen />}
      </appStateContext.Provider>
    </>
  );
});
