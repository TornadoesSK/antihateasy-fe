import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { State, useStore } from "../state/State";
import { Color, theme } from "../styles/ColorStyle";
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
  @computed get hatefulPct() {
    return ((this.hatefulPostCount / this.allPostCount) * 100).toPrecision(3);
  }
  @computed get chartData() {
    return [
      { name: "Safe posts", value: this.allPostCount - this.hatefulPostCount },
      { name: "Possibly hateful posts", value: this.hatefulPostCount },
    ];
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
            {state.hatefulPostCount}/{state.allPostCount} ({state.hatefulPct}%)
          </b>{" "}
          posts in your feed were hateful.
        </div>

        <PieChart width={520} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={state.chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            // fill="#8884d8"
            label
          >
            {state.chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? theme[Color.Primary] : theme[Color.Danger]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  }
);
