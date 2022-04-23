import { action, observable } from "mobx";
import { CancelablePromise } from "./api";
import { State } from "./State";

type QueryStateArgs<Options, Result> = {
  request: (options: Options) => CancelablePromise<Result>;
  variables: Options;
};

export class QueryState<Options, Result> extends State<
  QueryStateArgs<Options, Result>
> {
  @observable data: Result | null = null;
  @observable error: any | null = null;

  constructor(protected args: QueryStateArgs<Options, Result>) {
    super(args);

    this.args
      .request(this.args.variables)
      .then(this.handleReceive)
      .catch(this.handleError);
  }

  @action.bound
  private handleReceive(result: Result) {
    this.data = result;
  }
  @action.bound
  private handleError(error: any) {
    this.error = error;
  }
}
