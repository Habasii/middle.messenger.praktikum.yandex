import Block from "../../core/block";

export default class TopChat extends Block {
  profile: boolean;

  constructor(props:any) {
    super("div", {
      ...props,
      className: `${props.profile ? 'profile' : 'selected-user'}-top-info`,
    });
    this.profile = props.profile;
  }
  public render(): string {
    return `
    <div class="top-${this.profile ? 'profile' : 'chat'}-box">
        ${this.profile ? 
          `
            <div class="user-chat-info">
                <div class="user-profile-top">Детальная информация</div>
            </div>` 
          : 
          `
            <div class="avatar list-avatar-container"><img src="{{avatar}}"/></div>
            <div class="user-chat-info">
                <div class="user-name">{{name}}</div>
            </div>
            <div class="buttons"><i class="fa fa-ellipsis-v"></i></div>`
        }
    </div>
    `;
  }
}
