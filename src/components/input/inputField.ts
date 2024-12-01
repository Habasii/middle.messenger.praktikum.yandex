import Block from "../../core/block";
import _Input from "./input";
import { PropsBlock } from "../../core/types";

interface InputFieldProps extends PropsBlock {
  className: string;
  label?: string;
  type?: string;
  name?: string;
  disabled: boolean;
  placeholder: string;
  onBlur?: (E: Event) => void;
  onChange?: (E: Event) => void;
  change?: (E: Event) => void;
  blur?: (E: Event) => void;
}

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super("div", {
      ...props,
      className: "input",
      change: props.onChange,
      blur: props.onBlur,
      _Input: new _Input({
        ...props,
        className: "input-element",
        disabled: props.disabled,
        events: {
          change: props.onChange,
          blur: props.onBlur,
        },
      }),
    });
  }

  componentDidUpdate(oldProps: InputFieldProps, newProps: InputFieldProps) {
    if (typeof oldProps == "string") console.log(oldProps);
    this.children._Input.setProps({ disabled: newProps.disabled });

    return true;
  }

  public render(): string {
    return `
        <label class="input-container">
          {{{_Input}}}
          <div class="input-label">{{label}}</div>
        </label>
        <div class="input-error">{{#if error}}{{error}}{{/if}}</div>
    `;
  }
}
