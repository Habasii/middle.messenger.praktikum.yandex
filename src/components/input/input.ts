import Block from "../../core/block";
import { PropsBlock } from "../../core/types";

interface InputProps extends PropsBlock {
  className: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  id: string;
  onBlur?: (e?: Event) => void;
  onChange?: (e?: Event) => void;
  label: string;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    const attrs: {
      name?: string;
      disabled?: string;
      placeholder?: string;
      id?: string;
    } = {
      ...props.attrs,
    };
    if (props.name) attrs.name = props.name;
    if (props.disabled) attrs.disabled = "disabled";
    if (props.id) attrs.id = props.id;
    attrs.placeholder = props.placeholder || "";

    super("input", {
      ...props,
      className: "input-element",
      attrs,
    });
  }

  componentDidUpdate(oldProps: InputProps, newProps: InputProps) {
    if (typeof oldProps == "string") console.log(oldProps);
    if (newProps.disabled) this.element.setAttribute("disabled", "disabled");
    else this.element.removeAttribute("disabled");

    return true;
  }

  public render(): string {
    return ``;
  }
}
