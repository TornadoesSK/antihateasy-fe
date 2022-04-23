import { action, observable, reaction } from "mobx";
import { ApiError, CancelablePromise } from "../api";
import { State } from "./State";

type QueryStateArgs<Options, Result> = {
  request: (options: Options) => CancelablePromise<Result>;
  variables?: Options;
  onData?: (data: Result) => void;
  onError?: (error: string) => void;
};

export class QueryState<Options, Result> extends State<
  QueryStateArgs<Options, Result>
> {
  @observable data: Result | null = null;
  @observable error: any | null = null;
  lastVariables: Options | null = null;

  constructor(protected args: QueryStateArgs<Options, Result>) {
    super(args);

    reaction(
      () => this.args.variables,
      (variables) => {
        if (variables !== undefined) {
          this.fetch(variables);
        }
      },
      { fireImmediately: true }
    );
  }

  @action.bound
  fetch(variables: Options) {
    this.lastVariables = variables;
    this.args
      .request(variables)
      .then(this.handleReceive)
      .catch(this.handleError);
  }
  @action.bound
  refetch() {
    if (this.lastVariables) this.fetch(this.lastVariables);
  }

  @action.bound
  private handleReceive = (result: Result) => {
    console.group("Query received value");
    console.log(result);
    console.groupEnd();

    this.data = result;
    this.args.onData?.(result);
  };
  @action.bound
  private handleError = (error: ApiError) => {
    console.group("Query received error");
    console.log(error);
    console.groupEnd();

    this.error = error.message;
    this.args.onError?.(error.message);
  };
}
