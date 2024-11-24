import Block from "../../core/block";
import Input from "./input";

export default class InputField extends Block {
  constructor(props: any) {
    super("div", {
      ...props,
      className: "input",
      change: props.onChange,
      Input: new Input({
        className: "input__element",
        events: {
          change: props.onChange,
        },
      }),
    });
  }
  public render(): string {
    return `
        <label class="input__container">
          {{{Input}}}
          <div class="input__label">{{label}}</div>
        </label>
        <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
    `;
  }
}
