import Block from "../../core/block";
import _Input from "./input";

export default class InputField extends Block {
  constructor(props: any) {
    super("div", {
      ...props,
      className: "input",
      change: props.onChange,
      _Input: new _Input({
        className: "input__element",
        disabled: props.disabled,
        events: {
          change: props.onChange,
        },
      }),
    });
  }

  componentDidUpdate(oldProps:any, newProps:any) {
    this.children._Input.setProps({ disabled: newProps.disabled });

    return true;
  }

  public render(): string {
    return `
        <label class="input__container">
          {{{_Input}}}
          <div class="input__label">{{label}}</div>
        </label>
        <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
    `;
  }
}
