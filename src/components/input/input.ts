import Block from "../../core/block";

export default class Input extends Block {
  constructor(props: any) {
    super("input", {
      ...props,
      attrs: {
        placeholder: "",
      },
    });
  }
  public render(): string {
    return `
        <input class="input__element" placeholder name="{{name}}" {{#if disabled}} disabled="disabled" {{/if}} />
    `;
  }
}
