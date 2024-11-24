import Block from "../../core/block";

export default class ButtonLink extends Block {
  constructor(props: any) {
    super("button", {
      ...props,
      className: `button button__${props.color}`,
      events: {
        click: props.onClick,
      },
    });
  }
  public render(): string {
    return `
    <a class="button-link button-link__{{color}}" href="{{href}}" page="{{page}}" id="{{ id }}">
        {{#if icon_left}}
            <i class="fa {{ icon_left }}"></i>
        {{/if}}
        {{ label }}
        {{#if icon_right}}
            <i class="fa {{ icon_right }}"></i>
        {{/if}}
    </a>
    `;
  }
}
