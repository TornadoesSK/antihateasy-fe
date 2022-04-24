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
import { BackgroundColorStyle, Color, theme } from "../styles/ColorStyle";
import { ContainerStyle, ItemStyle } from "../styles/ContainerStyle";
import { InputStyle } from "../styles/InputStyle";
import { MarginStyle, PaddingStyle } from "../styles/PaddingStyle";
import { RoundedStyle } from "../styles/RoundedStyle";
import { ShadowStyle } from "../styles/ShadowStyle";
import { SizeStyle } from "../styles/SizeStyle";
import { TextStyle } from "../styles/TextStyle";
import { WarningIcon } from "../utils/icons";
import { truthy } from "../utils/truthy";
import MainScreenState from "./MainScreen";

class FeedState extends State<{
  appState: AppState;
  mainScreenState: MainScreenState;
}> {
  @observable allowForcefulPost: string | null = null;

  createPostQuery = new QueryState({
    request: DefaultService.postApiMessage,
    onData: ({ success }) => {
      if (success) {
        this.allowForcefulPost = null;
        this.input.reset();
        this.args.mainScreenState.messageQuery.refetch();
      } else {
        this.allowForcefulPost = this.input.value;
        this.input.error =
          "Your message was considered hateful. Press Send again to confirm posting.";
      }
    },
  });

  input = new InputState({});
  @computed get visibleErrors() {
    return [this.input.error].filter(truthy);
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

export const Feed = observer(
  ({ mainScreenState }: { mainScreenState: MainScreenState }) => {
    const appState = useAppState();
    const state = useStore(FeedState, { appState, mainScreenState });

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
          {mainScreenState.messages.map((message, idx) => (
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
                  ContainerStyle({}),
                  MarginStyle({ b: 8 }),
                  RoundedStyle({ a: 6 }),
                  PaddingStyle({ v: 12, r: 20, l: 12 }),
                  ShadowStyle({}),
                  css`
                    border: 1px solid ${theme[Color.Border]};
                  `,
                ]}
              >
                <img
                  css={[
                    RoundedStyle({ aPct: 100 }),
                    SizeStyle({ a: 32 }),
                    BackgroundColorStyle(Color.White),
                    MarginStyle({ r: 12 }),
                  ]}
                  src={`img/person${(message.name.charCodeAt(0) % 5) + 1}.jpg`}
                />
                <div css={[ItemStyle({ grow: 1, shrink: 1 })]}>
                  <div
                    css={[
                      ContainerStyle({ justifyContent: "space-between" }),
                      PaddingStyle({ b: 10 }),
                    ]}
                  >
                    <span css={[TextStyle({ medium: true })]}>
                      {message.name}
                    </span>
                    {message.hate && (
                      <span title="This content may be hateful">
                        <WarningIcon />
                      </span>
                    )}
                  </div>
                  <div lang="">{message.content}</div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </>
    );
  }
);
