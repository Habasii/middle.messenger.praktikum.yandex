import { ButtonLink } from "../../components";
import Block from "../../core/block";

interface ErrorPageProps extends Block {
  code?: string;
  comment?: string;
  onClick: () => void;
}

export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super("button", {
      ...props,
      className: `error-container`,
      BackButton: new ButtonLink({
        label: "Назад к чатам",
        color: "primary",
        page: "list",
      }),
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
