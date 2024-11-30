import { Input } from "../../components";
import Block from "../../core/block";
import { PropsBlock } from "../../core/types";

interface ButtonProps extends PropsBlock {
  profile: boolean;
  onClick: () => void;
  icon: string;
}

export default class ButtonIcon extends Block {
  profile: boolean;

  constructor(props: ButtonProps) {
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
