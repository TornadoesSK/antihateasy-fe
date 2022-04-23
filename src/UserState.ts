import { action, computed, observable, reaction } from "mobx";
import { DefaultService } from "./api";
import { QueryState } from "./QueryState";

export class UserState {
  @observable current: string | null = null;

  constructor() {
    reaction(
      () => this.loginQuery.data,
      (data) => (this.current = data.id)
    );
    reaction(
      () => this.registerQuery.data,
      (data) => (this.current = data.id)
    );
  }

  loginQuery = new QueryState({
    request: DefaultService.getApiUser,
  });

  registerQuery = new QueryState({
    request: DefaultService.postApiUser,
  });

  @action.bound login(username: string) {
    this.loginQuery.fetch({ name: username });
  }
  @action.bound register(username: string) {
    this.registerQuery.fetch({ body: { name: username } });
  }
  @action.bound logout() {
    this.current = null;
  }
}
