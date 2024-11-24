import { Button, ButtonLink, Input } from "../../components";
import Block from "../../core/block";

export default class LoginPage extends Block {
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
        onChange: (e:any) => {
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
      InputPassword: new Input({ label: "Логин" }),
      SignInButton: new ButtonLink({ label: "Войти", color: "primary", page: "list" }),
      SignUpButton: new ButtonLink({
        label: "Нет аккаунта?",
        color: "link",
        onClick: () => console.log(this.props.formState),
        page: 'auth',
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
