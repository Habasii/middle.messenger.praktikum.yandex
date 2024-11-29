import { Input } from "../../components";
import Block from "../../core/block";

interface ButtonIconProps extends Block {
  icon: string;
  profile: boolean;
  onClick: () => void;
}

export default class ButtonIcon extends Block {
  profile: boolean;

  constructor(props:ButtonIconProps) {
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
