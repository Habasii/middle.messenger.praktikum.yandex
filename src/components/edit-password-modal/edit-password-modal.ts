import Block from "../../core/block";
import { Input, Dialog } from "../../components";
import Validation from "../../core/validation";

class DialogBody extends Block {
  constructor() {
    super("p", {
      formState: {},
      errors: [],
      InputPassword: new Input({ label: "Пароль", name: "password", onBlur: (e:Event) => Validation(this, e.target, 'InputPassword', 'password') }),
      InputPasswordRepeat: new Input({ label: "Повторите пароль", name: "repeat_password", onBlur: (e:Event) => Validation(this, e.target, 'InputPasswordRepeat', 'password') }),
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
        onOk: () => {
          let controller:any = this.children.Dialog.children.Body;
          controller.props.errors = [
            Validation(controller, document.querySelector('.dialog-body [name="password"]'), 'InputPassword', 'password'),
            Validation(controller, document.querySelector('.dialog-body [name="repeat_password"]'), 'InputPasswordRepeat', 'password')
          ].filter(c => c);
          console.log(controller.props.formState);

          if(controller.props.errors.length == 0) props.onOk();
        },
        Body: new DialogBody(),
      }),
    });
  }
  render(): string {
    return `{{{ Dialog }}}`;
  }
}
