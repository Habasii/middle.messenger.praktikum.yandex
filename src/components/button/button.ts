import Block from "../../core/block";

interface ButtonProps extends Block {
  label: string;
  disabled: boolean;
  placeholder: string;
  href: string;
  page: string;
  color?: string;
  onClick: () => void;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", {
      ...props,
      className: `button button-${props.color}`,
      attrs: {
        href: props.href,
        page: props.page,
        id: props.id,
      },
      events: {
        click: props.onClick,
      },
    });
  }
  public render(): string {
    return `
      {{#if icon_left}}
          <i class="fa {{ icon_left }}"></i>
      {{/if}}
          {{ label }}
      {{#if icon_right}}
          <i class="fa {{ icon_right }}"></i>
      {{/if}}
    `;
  }
}
