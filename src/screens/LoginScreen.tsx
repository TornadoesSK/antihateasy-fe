import { css } from "@emotion/react";
import { action, computed, reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { DefaultService } from "../api";
import { AppState, useAppState } from "../AppState";
import { InputState } from "../state/InputState";
import { QueryState } from "../state/QueryState";
import { State, useStore } from "../state/State";
import { ButtonStyle } from "../styles/ButtonStyle";
import { ContainerStyle } from "../styles/ContainerStyle";
import { InputStyle } from "../styles/InputStyle";
import { TextStyle } from "../styles/TextStyle";

type LoginScreenStateArgs = { appState: AppState };
class LoginScreenState extends State<LoginScreenStateArgs> {
  constructor(protected args: LoginScreenStateArgs) {
    super(args);
    reaction(
      () => this.loginQuery.data,
      (data) => (this.args.appState.user = data.id)
    );
    reaction(
      () => this.registerQuery.data,
      (data) => (this.args.appState.user = data.id)
    );
  }

  loginQuery = new QueryState({
    request: DefaultService.getApiUser,
  });
  registerQuery = new QueryState({
    request: DefaultService.postApiUser,
  });

  input = new InputState({});
  @action.bound handleLoginClick = () => {
    const { error, value } = this.input.validate();
    if (!error) {
      this.loginQuery.fetch({ name: value });
    }
  };
  @action.bound handleRegisterClick = () => {
    const { error, value } = this.input.validate();
    if (!error) {
      this.registerQuery.fetch({ body: { name: value } });
    }
  };

  @computed get visibleErrors() {
    return `${this.input.error ?? ""}\n
    ${this.loginQuery.error ?? ""}\n
    ${this.registerQuery.error ?? ""}
    `;
  }
}

export const LoginScreen = observer(() => {
  const appState = useAppState();
  const state = useStore(LoginScreenState, { appState });

  return (
    <div
      css={[
        ContainerStyle({
          justifyContent: "center",
          alignItems: "center",
        }),
        css`
          height: 100vh;
        `,
      ]}
    >
      <div css={[ContainerStyle({ direction: "column" })]}>
        <h1 css={[TextStyle({ medium: true })]}>Login to Antihateasy Demo</h1>
        <input css={[InputStyle()]} type="text" {...state.input.props} />
        <div>{state.visibleErrors}</div>
        <button
          css={[ButtonStyle()]}
          onClick={state.handleLoginClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          login
        </button>
        <button
          css={[ButtonStyle()]}
          onClick={state.handleRegisterClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          register
        </button>
      </div>
    </div>
  );
});
