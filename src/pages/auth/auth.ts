import { Button, ButtonLink, Input } from "../../components";
import Block from "../../core/block";
import renderDOM from "../../core/renderDom";
import Validation from "../../core/validation";
import { GoTo } from "../../core/functions";

export default class AuthPage extends Block {
  constructor(props:any) {
    super("div", {
      ...props,
      formState: {},
      errors: [],
      className: "container",
      InputLogin: new Input({ label: "Логин", name: "login", onChange: (e:Event) => Validation(this, e.target, 'InputLogin', 'login') }),
      InputEmail: new Input({ label: "Почта", name: "email", onChange: (e:Event) => Validation(this, e.target, 'InputEmail', 'email') }),
      InputName: new Input({ label: "Имя", name: "first_name", onChange: (e:Event) => Validation(this, e.target, 'InputName', 'first_name') }),
      InputSecondName: new Input({ label: "Фамилия", name: "second_name", onChange: (e:Event) => Validation(this, e.target, 'InputSecondName', 'second_name') }),
      InputPhone: new Input({ label: "Телефон", name: "phone", onChange: (e:Event) => Validation(this, e.target, 'InputPhone', 'phone') }),
      InputPassword: new Input({ label: "Пароль", name: "password", onChange: (e:Event) => Validation(this, e.target, 'InputPassword', 'password') }),
      InputPasswordRepeat: new Input({ label: "Повторите пароль", name: "repeat_password", onChange: (e:Event) => Validation(this, e.target, 'InputPasswordRepeat', 'password') }),
      
      SignInButton: new ButtonLink({ label: "Войти", color: "link", page: "login" }),
      SignUpButton: new ButtonLink({
        label: "Зарегистироваться",
        color: "primary",
        onClick: () => {
          this.props.errors = [
            Validation(this, document.querySelector('[name="login"]'), 'InputLogin', 'login'),
            Validation(this, document.querySelector('[name="email"]'), 'InputEmail', 'email'),
            Validation(this, document.querySelector('[name="first_name"]'), 'InputName', 'first_name'),
            Validation(this, document.querySelector('[name="second_name"]'), 'InputSecondName', 'second_name'),
            Validation(this, document.querySelector('[name="phone"]'), 'InputPhone', 'phone'),
            Validation(this, document.querySelector('[name="password"]'), 'InputPassword', 'password'),
            Validation(this, document.querySelector('[name="repeat_password"]'), 'InputPasswordRepeat', 'password')
          ].filter(c => c);
          console.log(this.props.formState);
          
          if(this.props.errors.length == 0) {
            GoTo('login');
          }
        }
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
