import {
  action,
  computed,
  IReactionDisposer,
  observable,
  reaction,
} from "mobx";

export default class TestComponentState {
  @observable observableFoo = 0;
  @observable observableBar = 0;
  reaction: IReactionDisposer;

  constructor({ bar = 0 }) {
    this.observableBar = bar;
    // TODO find a smart way of disposing the reaction
    this.reaction = reaction(
      () => this.observableBar,
      (bar) => {
        // alert("Reaction to bar");
      },
      { fireImmediately: true }
    );
  }

  get getterExample() {
    return "This is a getter";
  }

  @action.bound handleClickIncrement() {
    this.observableFoo += 1;
  }
  @action.bound handleClickCopy() {
    this.observableBar = this.observableFoo;
  }

  @computed get computedFooBar() {
    return this.observableFoo + this.observableBar;
  }
}
