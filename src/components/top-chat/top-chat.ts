import Block from "../../core/block";

interface TopChatProps extends Block {
  profile: boolean;
}

export default class TopChat extends Block {
  constructor(props: TopChatProps) {
    super("div", {
      ...props,
      className: `${props.profile ? "profile" : "selected-user"}-top-info`,
    });
  }
  public render(): string {
    return `
    <div class="top-{{#if profile}}profile{{else}}chat{{/if}}-box">
        {{#if profile}}
            <div class="user-chat-info">
                <div class="user-profile-top">Детальная информация</div>
            </div>
        {{else}}
            <div class="avatar list-avatar-container"><img src="{{avatar}}"/></div>
            <div class="user-chat-info">
                <div class="user-name">{{name}}</div>
            </div>
            <div class="buttons"><i class="fa fa-ellipsis-v"></i></div>
        {{/if}}
    </div>
    `;
  }
}
