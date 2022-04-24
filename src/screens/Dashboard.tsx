import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { State, useStore } from "../state/State";
import { PaddingStyle } from "../styles/PaddingStyle";
import { TextStyle } from "../styles/TextStyle";

class DashboardState extends State {
  @computed get allPostCount() {
    return 15;
  }
  @computed get hatefulPostCount() {
    return Math.round(this.allPostCount / 3);
  }
}

export const Dashboard = observer(() => {
  const state = useStore(DashboardState);
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
});
