import { ButtonLink, Input } from "../../components";
import Block from "../../core/block";
import Validation from "../../core/validation";
import { GoTo } from "../../core/functions";

interface LoginPageProps extends Block {
  className: string;
  formState: Record<string, string>;
}

export default class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super("div", {
      ...props,
      formState: {},
      errors: [],
      className: "container",
      InputLogin: new Input({
        label: "Логин",
        name: "login",
        onBlur: (e: Event) => Validation(this, e.target, "InputLogin", "login"),
      }),
      InputPassword: new Input({
        label: "Пароль",
        name: "password",
        onBlur: (e: Event) =>
          Validation(this, e.target, "InputPassword", "password"),
      }),
      SignInButton: new ButtonLink({
        label: "Войти",
        color: "primary",
        onClick: () => {
          this.props.errors = [
            Validation(
              this,
              document.querySelector('[name="login"]'),
              "InputLogin",
              "login"
            ),
            Validation(
              this,
              document.querySelector('[name="password"]'),
              "InputPassword",
              "password"
            ),
          ].filter((c) => c);
          console.log(this.props.formState);

          if (this.props.errors.length == 0) {
            GoTo("list");
          }
        },
      }),
      SignUpButton: new ButtonLink({
        label: "Нет аккаунта?",
        color: "link",
        page: "auth",
      }),
    });
  }
  public render(): string {
    return `
      <form class="login-form">
          {{{ InputLogin }}}
          {{{ InputPassword }}}
          {{{ SignInButton }}}
          {{{ SignUpButton }}}
      </form>
    `;
  }
}
