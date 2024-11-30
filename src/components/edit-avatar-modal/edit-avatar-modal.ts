import Block from "../../core/block";
import { Input, Dialog } from "../../components";
import { PropsBlock } from "../../core/types";

interface EditAvatarModalProps extends PropsBlock {
  onOk: () => void;
}

class DialogBody extends Block {
  constructor() {
    super("p", {
      InputImg: new Input({ label: "Пароль", name: "img", type: "file" }),
    });
  }

  render(): string {
    return `
      <input class="input-element-img" name="файл не выбран" type="file" />
    `;
  }
}

export default class EditAvatarModal extends Block {
  constructor(props: EditAvatarModalProps) {
    super("div", {
      ...props,
      Dialog: new Dialog({
        title: "Изменение аватара",
        labelOk: "Сохранить",
        onOk: props.onOk,
        Body: new DialogBody(),
      }),
    });
  }
  render(): string {
    return `{{{ Dialog }}}`;
  }
}
