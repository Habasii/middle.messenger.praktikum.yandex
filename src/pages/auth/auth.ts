import { Button, ButtonLink, Input } from "../../components";
import Block from "../../core/block";

export default class AuthPage extends Block {
  constructor(props:any) {
    super("div", {
      ...props,
      formState: {
        login: "",
        password: "",
      },
      errors: {
        login: "",
        password: "",
      },
      className: "container",
      InputLogin: new Input({
        label: "Логин",
        name: "login",
        onChange: (e:Event) => {
          const value = e.target.value;
          const error = value === "error" ? "Some error is happened." : "";
          this.children.InputLogin.setProps({
            error,
          });
          if (!error) {
            return;
          }

          this.setProps({
            formState: {
              ...this.props.formState,
              login: value,
            },
          });
        },
      }),
      InputEmail: new Input({ label: "Почта", name: "email" }),
      InputName: new Input({ label: "Имя", name: "first_name" }),
      InputSecondName: new Input({ label: "Фамилия", name: "second_name" }),
      InputPhone: new Input({ label: "Телефон", name: "phone" }),
      InputPassword: new Input({ label: "Пароль", name: "password" }),
      InputPasswordRepeat: new Input({ label: "Повторите пароль", name: "repeat_password" }),
      
      SignInButton: new ButtonLink({ label: "Войти", color: "link", page: "login" }),
      SignUpButton: new ButtonLink({
        label: "Зарегистироваться",
        color: "primary",
        onClick: () => console.log(this.props.formState),
        page: "login"
      }),
    });
  }
  public render(): string {
    return `
      <form class="login-form">
          {{{ InputEmail }}}
          {{{ InputLogin }}}
          {{{ InputName }}}
          {{{ InputSecondName }}}
          {{{ InputPhone }}}
          {{{ InputPassword }}}
          {{{ InputPasswordRepeat }}}

          {{{ SignUpButton }}}
          {{{ SignInButton }}}
      </form>
    `;
  }
}
