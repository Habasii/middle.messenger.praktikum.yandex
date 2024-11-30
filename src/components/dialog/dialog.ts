import Block from "../../core/block";
import { ButtonLink } from "../index";

export default class Dialog extends Block {
  constructor(props: any) {
    super("div", {
      ...props,
      className: "dialog-container",
      OkButton: new ButtonLink({
        label: props.labelOk,
        color: "primary",
        onClick: props.onOk,
      }),
      CancelButton: new ButtonLink({
        label: "labelCancel",
        color: "link",
      }),
    });
  }

  render(): string {
    return `
    <div class="dialog">
        <h2 class="dialog-title">{{title}}</h2>
        <div class="dialog-body">
            {{{ Body }}}
        </div>
        <div class="dialog-footer">
            {{{ OkButton }}}
            {{#if labelCancel}}
                {{{ CancelButton }}}
            {{/if}}
        </div>
    </div>
  `;
  }
}
