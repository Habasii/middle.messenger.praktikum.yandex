import Block from "../../core/block";

interface InputProps extends Block {
  className: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  attrs: {
    name?: string;
    disabled?: string;
    placeholder?: string;
    id?: string;
  };
  events?: Record<string, (e: Event) => void | string>;
  onBlur?: (e: Event) => void | string;
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
    if (newProps.disabled) this.element.setAttribute("disabled", "disabled");
    else this.element.removeAttribute("disabled");

    return true;
  }

  public render(): string {
    return ``;
  }
}
