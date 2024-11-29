import { Input } from "../../components";
import Block from "../../core/block";

export default class MessageBox extends Block {
  profile: boolean;

  constructor(props:any) {
    super("div", {
      ...props,
      className: 'message-box',
      InputMessage: new Input({ name: "message" }),
    });
    this.profile = props.profile;
  }
  public render(): string {
    return `
      <div class="includes"><i class="fa fa-paperclip"></i></div>
      <div class="message-input">{{{ InputMessage }}}</div>
      <div class="message-enter"><i class="fa fa-arrow-right"></i></div>
    `;
  }
}
