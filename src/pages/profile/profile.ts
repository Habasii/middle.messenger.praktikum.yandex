import Block from "../../core/block";
import {
  ListSearch,
  Input,
  TopChat,
  ButtonLink,
  EditPasswordModal,
  EditAvatarModal,
} from "../../components";
import Validation from "../../core/validation";

interface ListPageProps extends Block {
  className: string;
  formState: Record<string, string>;
}

export default class ListPage extends Block {
  constructor(props: ListPageProps) {
    super("div", {
      ...props,
      formState: {},
      errors: [],
      className: "container profile",
      Search: new ListSearch({ label: "Поиск", name: "search", profile: true }),
      TopChat: new TopChat({ name: "Имя", profile: true }),

      InputLogin: new Input({
        label: "Логин",
        name: "login",
        disabled: true,
        onBlur: (e: Event) => Validation(this, e.target, "InputLogin", "login"),
      }),
      InputEmail: new Input({
        label: "Почта",
        name: "email",
        disabled: true,
        onBlur: (e: Event) => Validation(this, e.target, "InputEmail", "email"),
      }),
      InputName: new Input({
        label: "Имя",
        name: "first_name",
        disabled: true,
        onBlur: (e: Event) =>
          Validation(this, e.target, "InputName", "first_name"),
      }),
      InputSecondName: new Input({
        label: "Фамилия",
        name: "second_name",
        disabled: true,
        onBlur: (e: Event) =>
          Validation(this, e.target, "InputSecondName", "second_name"),
      }),
      InputPhone: new Input({
        label: "Телефон",
        name: "phone",
        disabled: true,
        onBlur: (e: Event) => Validation(this, e.target, "InputPhone", "phone"),
      }),
      InputPassword: new Input({
        label: "Пароль",
        name: "password",
        disabled: true,
        onBlur: (e: Event) =>
          Validation(this, e.target, "InputPassword", "password"),
      }),
      InputPasswordRepeat: new Input({
        label: "Повторите пароль",
        name: "repeat_password",
        disabled: true,
        onBlur: (e: Event) =>
          Validation(this, e.target, "InputPasswordRepeat", "password"),
      }),

      ChangeButton: new ButtonLink({
        label: "Изменить данные",
        color: "primary",
        onClick: () => {
          this.setProps({ readonly: false });
        },
      }),
      SaveButton: new ButtonLink({
        label: "Сохранить",
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
              document.querySelector('[name="email"]'),
              "InputEmail",
              "email"
            ),
            Validation(
              this,
              document.querySelector('[name="first_name"]'),
              "InputName",
              "first_name"
            ),
            Validation(
              this,
              document.querySelector('[name="second_name"]'),
              "InputSecondName",
              "second_name"
            ),
            Validation(
              this,
              document.querySelector('[name="phone"]'),
              "InputPhone",
              "phone"
            ),
            Validation(
              this,
              document.querySelector('[name="password"]'),
              "InputPassword",
              "password"
            ),
            Validation(
              this,
              document.querySelector('[name="repeat_password"]'),
              "InputPasswordRepeat",
              "password"
            ),
          ].filter((c) => c);
          console.log(this.props.formState);

          if (this.props.errors.length == 0) this.setProps({ readonly: true });
        },
      }),
      PswdButton: new ButtonLink({
        label: "Изменить пароль",
        color: "link",
        onClick: () => this.setProps({ editPasswrdDialog: true }),
      }),
      CancelButton: new ButtonLink({
        label: "Отмена",
        color: "link",
        page: "profile",
      }),
      ExitButton: new ButtonLink({
        label: "Выйти",
        color: "link",
        page: "login",
      }),
      ChangeAvatarButton: new ButtonLink({
        label: "Изменить аватар",
        color: "link",
        onClick: () => this.setProps({ editAvatarDialog: true }),
      }),

      EditPasswordModal: new EditPasswordModal({
        onOk: () => this.setProps({ editPasswrdDialog: false }),
      }),

      EditAvatarModal: new EditAvatarModal({
        onOk: () => this.setProps({ editAvatarDialog: false }),
      }),
    });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    this.children.InputLogin.setProps({ disabled: newProps.readonly });
    this.children.InputEmail.setProps({ disabled: newProps.readonly });
    this.children.InputName.setProps({ disabled: newProps.readonly });
    this.children.InputSecondName.setProps({ disabled: newProps.readonly });
    this.children.InputPhone.setProps({ disabled: newProps.readonly });
    this.children.InputPassword.setProps({ disabled: newProps.readonly });
    this.children.InputPasswordRepeat.setProps({ disabled: newProps.readonly });
    return true;
  }

  public render(): string {
    return `
    <div class="list-left-block">
        <div class="list-search">{{{ Search }}}</div>
        <div class="list-contacts-container">
            <div class="avatar-container">
                <img class="profile-avatar" src="/src/assets/no_user.png" alt="Аватар пользователя">
                {{{ ChangeAvatarButton }}}
            </div>
            <div class="lofin-info-container">
                {{{ InputLogin }}}
                {{{ InputPhone }}}
            </div>
            <div class="profile-actions-1">
                {{{ ExitButton }}}
            </div>
        </div>
    </div>
    <div class="list-right-block">
        {{{ TopChat }}}
        <div class="profile-info">
            <div class="profile-info-data">
                <form class="user-form">
                    {{{ InputEmail}}}
                    {{{ InputName }}}
                    {{{ InputSecondName }}}
                    {{{ InputPassword}}}
                    {{{ InputPasswordRepeat }}}
                </form>
            </div>
            <div class="profile-actions-2">
                    {{#if readonly }}
                        {{{ ChangeButton }}}
                        {{{ PswdButton }}}
                    {{else}}
                        {{{ SaveButton }}}
                        {{{ CancelButton }}}
                    {{/if}}
            </div>
        </div>
    </div>

    {{#if editPasswrdDialog}}
        {{{ EditPasswordModal }}}
    {{/if}}
    
    {{#if editAvatarDialog}}
        {{{ EditAvatarModal }}}
    {{/if}}
    `;
  }
}
