import { ButtonLink } from "../../components";;
import Block from "../../core/block";

export default class ErrorPage extends Block {
  constructor(props: any) {
    super("button", {
      ...props,
      className: `error-container`,
      BackButton: new ButtonLink({ label: "Назад к чатам", color: "primary", page: "list" }),
    });
  }
  public render(): string {
    return `
        <span class="error-code">{{code}}</span>
        <span class="error-comment">{{comment}}</span>
        <div class="error-button-container">
            {{{ BackButton }}}
        </div>
    `;
  }
}
