import Block from "../../core/block";
import { ListSearch, Input, TopChat, ButtonLink } from "../../components";

export default class ListPage extends Block {
  constructor(props:any) {
    super("div", {
      ...props,
      className: "container profile",
      Search: new ListSearch({ label: "Почта", name: "email", profile: true }),
      TopChat: new TopChat({ name: 'Имя', profile: true }),

      InputLogin: new Input({
        label: "Логин",
        name: "login",
        disabled: true,
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
      InputEmail: new Input({ label: "Почта", name: "email", disabled: true }),
      InputName: new Input({ label: "Имя", name: "first_name", disabled: true }),
      InputSecondName: new Input({ label: "Фамилия", name: "second_name", disabled: true }),
      InputPhone: new Input({ label: "Телефон", name: "phone", disabled: true }),
      InputPassword: new Input({ label: "Пароль", name: "password", disabled: true }),
      InputPasswordRepeat: new Input({ label: "Повторите пароль", name: "repeat_password", disabled: true }),
      
      ChangeButton: new ButtonLink({
        label: "Изменить данные",
        color: "primary",
        onClick: () => {
          this.setProps({readonly: false});
        },
      }),
      SaveButton: new ButtonLink({
        label: "Сохранить",
        color: "primary",
        onClick: () => {
          this.setProps({readonly: true});
        },
      }),
      PswdButton: new ButtonLink({ label: "Изменить пароль", color: "link", page: "profile-edit-password" }),
      CancelButton: new ButtonLink({ label: "Отмена", color: "link", page: "profile" }),
      ExitButton: new ButtonLink({ label: "Выйти", color: "link", page: "login" }),
      ChangeAvatarButton: new ButtonLink({ label: "Изменить аватар", color: "link", page: "profile-edit-avatar" }),
    });
  }


  componentDidUpdate(oldProps:any, newProps:any) {
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
    `;
  }
}
