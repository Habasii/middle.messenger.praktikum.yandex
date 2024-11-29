import Block from "../../core/block";

interface ButtonLinkProps {
  label?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  href?: string;
  page?: string;
  color?: string;
  onClick: () => void;
  icon_right: string;
  icon_left: string;
  attrs?: {
    page?: string;
    href?: string;
    id?: string;
  };
}

export default class ButtonLink extends Block {
  constructor(props: ButtonLinkProps) {
    const attrs: {
      page?: string;
      href?: string;
      id?: string;
    } = {
      id: props.id,
      ...props.attrs,
    };
    if (props.page) attrs.page = props.page;
    if (props.href) attrs.href = props.href;
    if (props.id) attrs.id = props.id;

    super("button", {
      ...props,
      className: `button-link button-link-${props.color}`,
      attrs,
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
