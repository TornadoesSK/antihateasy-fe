import { css } from "@emotion/react";
import { action, computed, reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { DefaultService } from "../api";
import { AppState, useAppState } from "../AppState";
import { ErrorMessages } from "../components/ErrorMessages";
import { InputState } from "../state/InputState";
import { QueryState } from "../state/QueryState";
import { State, useStore } from "../state/State";
import { ButtonStyle } from "../styles/ButtonStyle";
import { BackgroundColorStyle, Color } from "../styles/ColorStyle";
import { ContainerStyle } from "../styles/ContainerStyle";
import { InputStyle } from "../styles/InputStyle";
import { MarginStyle, PaddingStyle } from "../styles/PaddingStyle";
import { RoundedStyle } from "../styles/RoundedStyle";
import { ShadowStyle } from "../styles/ShadowStyle";
import { TextStyle } from "../styles/TextStyle";

type LoginScreenStateArgs = { appState: AppState };
class LoginScreenState extends State<LoginScreenStateArgs> {
  constructor(protected args: LoginScreenStateArgs) {
    super(args);
    reaction(
      () => this.loginQuery.data,
      (data) => (this.args.appState.user = data)
    );
    reaction(
      () => this.registerQuery.data,
      (data) => (this.args.appState.user = data)
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
    return [
      this.input.error,
      this.loginQuery.error,
      this.registerQuery.error,
    ].filter(Boolean);
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
      <div
        css={[
          ContainerStyle({ direction: "column", alignItems: "center" }),
          BackgroundColorStyle(Color.PrimaryLight80),
          PaddingStyle({ a: 120 }),
          RoundedStyle({ a: 10 }),
          ShadowStyle({ box: true }),
        ]}
      >
        <h1
          css={[
            TextStyle({ medium: true, veryLarge: true }),
            PaddingStyle({ b: 64 }),
          ]}
        >
          Login to Antihateasy Demo
        </h1>
        <div
          css={[
            ContainerStyle({ direction: "column" }),
            PaddingStyle({ b: 30 }),
          ]}
        >
          <div css={[TextStyle(), PaddingStyle({ b: 4 })]}>Username</div>
          <input
            css={[InputStyle({ error: !!state.visibleErrors.length })]}
            type="text"
            {...state.input.props}
          />
          <ErrorMessages errors={state.visibleErrors} />
        </div>
        <div css={[ContainerStyle({ direction: "column" })]}>
          <button
            css={[ButtonStyle({ primary: true }), MarginStyle({ b: 8 })]}
            onClick={state.handleLoginClick}
          >
            Login
          </button>
          <button
            css={[ButtonStyle({ primary: true })]}
            onClick={state.handleRegisterClick}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
});
