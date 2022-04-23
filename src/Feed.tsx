import { observer } from "mobx-react-lite";
import { useStore } from "./State";
import { useAppState } from "./AppState";
import { action, computed } from "mobx";
import { AppState } from "./AppState";
import { State } from "./State";
import { QueryState } from "./QueryState";
import { DefaultService } from "./api";
import { InputState } from "./InputState";

export default class FeedState extends State<{ appState: AppState }> {
  @action.bound handleLogoutClick() {
    this.args.appState.user = null;
  }

  messageQuery = new QueryState({
    request: DefaultService.getApiMessageAll,
    variables: {},
  });

  @computed get messages() {
    return this.messageQuery.data ?? [];
  }

  createPostQuery = new QueryState({
    request: DefaultService.postApiMessage,
    onData: () => this.messageQuery.refetch(),
  });
  input = new InputState({});

  @action.bound handleCreatePostClick() {
    this.createPostQuery.fetch({
      body: { user_id: this.args.appState.user, text: this.input.value },
    });
    this.input.reset();
  }
}

export const Feed = observer(() => {
  const appState = useAppState();
  const state = useStore(FeedState, { appState });

  return (
    <>
      <button
        onClick={state.handleLogoutClick}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Log out
      </button>
      <div className="flex flex-col items-center">
        <span>Create a new post</span>
        <input type="text" {...state.input.props} />
        <button onClick={state.handleCreatePostClick}>Send</button>
      </div>
      <a
        href="#"
        className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hello {appState.user}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In temporibus
          at consectetur optio laborum voluptatem rem tenetur sunt obcaecati
          minima sequi laudantium corporis facere, culpa quas, eligendi
          aspernatur quod nisi?
        </p>
      </a>
      {state.messages.map((message: any) => (
        <div>
          <span>{message.user_id}</span>
          <span>{message.text}</span>
        </div>
      ))}
    </>
  );
});
