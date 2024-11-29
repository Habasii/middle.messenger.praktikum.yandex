import { Input } from "../../components";
import Block from "../../core/block";

export default class ButtonIcon extends Block {
  profile: boolean;

  constructor(props:any) {
    super("i", {
      ...props,
      className: `fa ${props.icon}`,
      InputMessage: new Input({ name: "message" }),
      events: {
        click: props.onClick,
      },
    });
    this.profile = props.profile;
  }
  public render(): string {
    return ``;
  }
}
