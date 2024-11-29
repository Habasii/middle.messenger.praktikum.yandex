import Block from "../../core/block";

export default class Input extends Block {
  constructor(props: any) {
    let attrs = {
      ...props.attrs,
    }
    if(props.name) attrs.name = props.name;
    if(props.disabled) attrs.disabled = 'disabled';
    if(props.id) attrs.id = props.id;
    attrs.placeholder = props.placeholder || '';
    
    super("input", {
      ...props,
      className: "input-element",
      attrs,
    });
  }

  componentDidUpdate(oldProps:any, newProps:any) {
    if(newProps.disabled) this.element.setAttribute('disabled', 'disabled');
    else this.element.removeAttribute('disabled');

    return true;
  }

  public render(): string {
    return ``;
  }
}
