import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { State, useStore } from "../state/State";
import { PaddingStyle } from "../styles/PaddingStyle";
import { TextStyle } from "../styles/TextStyle";
import MainScreenState from "./MainScreen";

class DashboardState extends State<{ mainScreenState: MainScreenState }> {
  @computed get allPostCount() {
    return this.args.mainScreenState.messages.length;
  }
  @computed get hatefulPostCount() {
    return this.args.mainScreenState.messages.filter((message) => message.hate)
      .length;
  }
}

export const Dashboard = observer(
  ({ mainScreenState }: { mainScreenState: MainScreenState }) => {
    const state = useStore(DashboardState, { mainScreenState });
    return (
      <div css={[PaddingStyle({ h: 40, v: 40 })]}>
        <h1 css={[TextStyle({ veryLarge: true }), PaddingStyle({ b: 8 })]}>
          Dashboard
        </h1>
        <h2 css={[TextStyle(), PaddingStyle({ b: 40 })]}>
          Your current feed hate meter
        </h2>
        <div>
          <b>
            {state.hatefulPostCount}/{state.allPostCount}
          </b>{" "}
          posts in your feed were hateful.
        </div>
      </div>
    );
  }
);
