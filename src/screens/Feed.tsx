import { css } from "@emotion/react";
import { action, computed, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { DefaultService } from "../api";
import { AppState, useAppState } from "../AppState";
import { ErrorMessages } from "../components/ErrorMessages";
import { InputState } from "../state/InputState";
import { QueryState } from "../state/QueryState";
import { State, useStore } from "../state/State";
import { ButtonStyle } from "../styles/ButtonStyle";
import { Color, theme } from "../styles/ColorStyle";
import { ContainerStyle, ItemStyle } from "../styles/ContainerStyle";
import { InputStyle } from "../styles/InputStyle";
import { MarginStyle, PaddingStyle } from "../styles/PaddingStyle";
import { RoundedStyle } from "../styles/RoundedStyle";
import { ShadowStyle } from "../styles/ShadowStyle";
import { SizeStyle } from "../styles/SizeStyle";
import { TextStyle } from "../styles/TextStyle";

class FeedState extends State<{ appState: AppState }> {
  messageQuery = new QueryState({
    request: DefaultService.getApiMessageAll,
    variables: {},
  });

  @computed get messages() {
    return this.messageQuery.data ?? [];
  }

  @observable allowForcefulPost: string | null = null;

  createPostQuery = new QueryState({
    request: DefaultService.postApiMessage,
    onData: ({ success }) => {
      if (success) {
        this.allowForcefulPost = null;
        this.input.reset();
        this.messageQuery.refetch();
      } else {
        this.allowForcefulPost = this.input.value;
        this.input.error =
          "Your message was considered hateful. Press Send again to confirm posting.";
      }
    },
  });

  input = new InputState({});
  @computed get visibleErrors() {
    return [this.input.error].filter(Boolean) as any[];
  }

  @action.bound handleCreatePostClick() {
    const { value, error } = this.input.validate();
    if (error || !this.args.appState.user) return;
    this.createPostQuery.fetch({
      body: {
        user_id: this.args.appState.user.id,
        text: value,
        force: value === this.allowForcefulPost,
      },
    });
  }
}

export const Feed = observer(() => {
  const appState = useAppState();
  const state = useStore(FeedState, { appState });

  return (
    <>
      <div
        css={[
          ContainerStyle({ direction: "column", alignItems: "flex-start" }),
          PaddingStyle({ b: 30, h: 40 }),
        ]}
      >
        <div css={[TextStyle(), PaddingStyle({ b: 4 })]}>Create a post</div>
        <textarea
          {...state.input.props}
          css={[
            InputStyle({ error: !!state.visibleErrors.length }),
            SizeStyle({ wPct: 100 }),
          ]}
        />

        <ErrorMessages errors={state.visibleErrors} />
        <button
          css={[
            ButtonStyle({ primary: true }),
            MarginStyle({ t: 4 }),
            css`
              align-self: flex-end;
            `,
          ]}
          onClick={state.handleCreatePostClick}
        >
          Send
        </button>
      </div>
      <div
        css={[
          ItemStyle({ shrink: 1 }),
          PaddingStyle({ h: 40, b: 20 }),
          css`
            overflow-y: auto;
          `,
        ]}
      >
        {state.messages.map((message, idx) => (
          <div
            css={[
              css`
                position: relative;
              `,
            ]}
          >
            <article
              key={idx}
              data-testid="tweet"
              css={[
                ContainerStyle({ direction: "column" }),
                MarginStyle({ b: 8 }),
                RoundedStyle({ a: 6 }),
                PaddingStyle({ v: 12, h: 20 }),
                ShadowStyle({}),
                css`
                  border: 1px solid ${theme[Color.Border]};
                `,
              ]}
            >
              <div>User: {message.name}</div>
              <div lang="">{message.content}</div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
});
