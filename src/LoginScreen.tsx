import { action, observable, reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { DefaultService } from "./api";
import { AppState, useAppState } from "./AppState";
import { InputState } from "./InputState";
import { QueryState } from "./QueryState";
import { State, useStore } from "./State";

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
}

export const LoginScreen = observer(() => {
  const appState = useAppState();
  const state = useStore(LoginScreenState, { appState });

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <span>username</span>
      <span>{state.input.error}</span>
      <span>{state.loginQuery.error}</span>
      <span>{state.registerQuery.error}</span>
      <input type="text" {...state.input.props} />
      <button
        onClick={state.handleLoginClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        login
      </button>
      <button
        onClick={state.handleRegisterClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        register
      </button>
    </div>
  );
});
