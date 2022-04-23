import { observer } from "mobx-react";
import { AppState, appStateContext } from "./AppState";
import { LoginScreen } from "./screens/LoginScreen";
import { useStore } from "./state/State";
import { FeedScreen } from "./screens/FeedScreen";
import { Global } from "@emotion/react";
import { ResetStyle } from "./styles/ResetStyle";

export const App = observer(() => {
  const appState = useStore(AppState);
  return (
    <>
      <appStateContext.Provider value={appState}>
        <Global styles={ResetStyle()} />
        {appState.user ? <FeedScreen /> : <LoginScreen />}
      </appStateContext.Provider>
    </>
  );
});
