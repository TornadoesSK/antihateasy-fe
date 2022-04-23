import { action, computed, observable } from "mobx";
import { ChangeEvent, ChangeEventHandler } from "react";
import { State } from "./State";

export class InputState extends State<{}> {
  @observable value: string | null = null;
  @observable error: string | null = null;

  @computed get props() {
    return {
      value: this.value ?? "",
      onChange: this.handleChange,
    };
  }

  @action.bound reset = () => {
    console.log("here");

    this.value = null;
  };

  @action.bound handleChange = (props: ChangeEvent<HTMLInputElement>) => {
    this.value = props.target.value || null;
  };

  @action.bound validate = ():
    | { error: true; message: string; value: undefined }
    | { error: false; message: undefined; value: string } => {
    if (this.value === null) {
      this.error = "Enter a value";
      return {
        error: true,
        value: undefined,
        message: this.error,
      };
    } else {
      this.error = null;
      return {
        error: false,
        message: undefined,
        value: this.value,
      };
    }
  };
}
