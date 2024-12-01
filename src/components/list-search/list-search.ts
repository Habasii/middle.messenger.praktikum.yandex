import { ButtonLink, Input } from "..";
import Block from "../../core/block";
import { PropsBlock } from "../../core/types";

export default class ListSearch extends Block {
  constructor(props: PropsBlock) {
    super("div", {
      ...props,
      className: "list-search-box",
      BackButton: new ButtonLink({
        label: "Назад к чатам",
        color: "primary",
        page: "list",
        icon_right: "fa-cog",
        attrs: {
          href: "#",
          id: "button-profile",
        },
      }),
      ProfileButton: new ButtonLink({
        label: "Профиль",
        color: "primary",
        page: "profile",
        icon_left: "fa-cog",
        attrs: {
          href: "#",
          id: "button-list-search",
        },
      }),
      InputSearch: new Input({
        label: "Поиск",
        name: "chat-search",
      }),
    });
  }
  public render(): string {
    return `
    <div class="list-search-button-container">
        {{#if profile}}
            {{{ BackButton }}}
        {{else}}
            {{{ ProfileButton }}}
        {{/if}}
        </div>
    {{#if profile}}

    {{else}}
        <div class="list-search-input">
          {{{ InputSearch }}}
        </div>
    {{/if}}
    `;
  }
}
