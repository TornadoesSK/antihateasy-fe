import { observer } from "mobx-react-lite";
import { useStore } from "../state/State";
import { useAppState } from "../AppState";
import { action, observable } from "mobx";
import { AppState } from "../AppState";
import { State } from "../state/State";
import { ButtonStyle } from "../styles/ButtonStyle";
import { SizeStyle } from "../styles/SizeStyle";
import { ContainerStyle } from "../styles/ContainerStyle";
import { TextStyle } from "../styles/TextStyle";
import { MarginStyle, PaddingStyle } from "../styles/PaddingStyle";
import { css } from "@emotion/react";
import { BackgroundColorStyle, Color } from "../styles/ColorStyle";
import { Feed } from "./Feed";
import { Dashboard } from "./Dashboard";

export default class MainScreenState extends State<{ appState: AppState }> {
  @action.bound handleLogoutClick() {
    this.args.appState.user = null;
  }

  @observable dashboardActive = false;

  @action.bound handleDashboardClick() {
    this.dashboardActive = !this.dashboardActive;
  }
}

export const MainScreen = observer(() => {
  const appState = useAppState();
  const state = useStore(MainScreenState, { appState });

  return (
    <div css={[ContainerStyle({ justifyContent: "center" })]}>
      <div
        css={[
          ContainerStyle({ direction: "column" }),
          SizeStyle({ w: 600 }),
          BackgroundColorStyle(Color.PrimaryLight90),
          css`
            height: 100vh;
          `,
        ]}
      >
        <div
          css={[
            ContainerStyle({
              justifyContent: "space-between",
              alignItems: "flex-end",
            }),
            PaddingStyle({ t: 16, b: 16 }),
            PaddingStyle({ h: 40 }),
          ]}
        >
          <h4 css={[TextStyle({ veryLarge: true })]}>
            Hello{" "}
            <span css={[TextStyle({ veryLarge: true, medium: true })]}>
              {appState.user?.username}
            </span>
          </h4>
          <div>
            <button
              onClick={state.handleDashboardClick}
              type="button"
              css={[ButtonStyle({ small: true }), MarginStyle({ r: 8 })]}
            >
              {state.dashboardActive ? "Feed" : "Dashboard"}
            </button>
            <button
              onClick={state.handleLogoutClick}
              type="button"
              css={[ButtonStyle({ small: true })]}
            >
              Log out
            </button>
          </div>
        </div>
        {state.dashboardActive ? <Dashboard /> : <Feed />}
      </div>
    </div>
  );
});
