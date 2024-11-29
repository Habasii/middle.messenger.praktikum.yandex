import { Input, ButtonIcon } from "../../components";
import Block from "../../core/block";
import Validation from "../../core/validation";

export default class MessageBox extends Block {
  profile: boolean;

  constructor(props:any) {
    super("div", {
      ...props,
      formState: {},
      errors: [],
      className: 'message-box',
      InputMessage: new Input({ name: "message" }),
      ButtonIconSubmit: new ButtonIcon({
        icon: "fa-arrow-right",
        onClick: () => {
          this.props.errors = [
            Validation(this, document.querySelector('[name="message"]'), 'InputMessage', 'message'),
          ].filter(c => c);
          console.log(this.props.formState);
        },
      }),
    });
    this.profile = props.profile;
  }
  public render(): string {
    return `
      <div class="includes"><i class="fa fa-paperclip"></i></div>
      <div class="message-input">{{{ InputMessage }}}</div>
      <div class="message-enter">{{{ ButtonIconSubmit }}}</div>
    `;
  }
}
