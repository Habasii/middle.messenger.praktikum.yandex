import Block from "../../core/block";
import { Input, Dialog } from "../../components";

class DialogBody extends Block {
  constructor() {
    super("p", {
      InputPassword: new Input({ label: "Пароль", name: "password" }),
      InputPasswordRepeat: new Input({ label: "Повторите пароль", name: "repeat_password" }),
    });
  }

  render(): string {
    return `
        {{{ InputPassword }}}
        {{{ InputPasswordRepeat }}}
    `;
  }
}

export default class EditPasswordModal extends Block {
  constructor(props) {
    super("div", {
      ...props,
      Dialog: new Dialog({
        title: "Изменение пароля",
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
