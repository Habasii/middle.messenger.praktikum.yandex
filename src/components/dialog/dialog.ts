import Block from "../../core/block";
import { ButtonLink } from "../index";
import { PropsBlock } from "../../core/types";

interface DialogProps extends PropsBlock {
  profile: boolean;
  onOk: () => void;
  labelOk: string;
  title: string;
}

export default class Dialog extends Block {
  constructor(props: DialogProps) {
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
