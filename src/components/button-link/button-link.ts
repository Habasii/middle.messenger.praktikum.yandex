import Block from "../../core/block";

export default class ButtonLink extends Block {
  constructor(props: any) {
    super("button", {
      ...props,
      className: `button-link button-link__${props.color}`,
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
