import Block from "../../core/block";

export default class ErrorPage extends Block {
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
      <button class="button button__{{color}}" id="{{ id }}">
          {{#if icon_left}}
              <i class="fa {{ icon_left }}"></i>
          {{/if}}
              {{ label }}
          {{#if icon_right}}
              <i class="fa {{ icon_right }}"></i>
          {{/if}}
      </button>
    `;
  }
}
