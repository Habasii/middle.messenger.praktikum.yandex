import { ButtonLink, Input } from "..";
import Block from "../../core/block";

export default class CatCard extends Block {
  constructor(props:any) {
    console.log(props);
    super("div", {
      ...props,
      events: {
        click: props.onClick,
      },
      className: props.active ? 'card card_active' : 'card',
      // Card: new ButtonLink({
      //   cats: props.cats,
      // }),
    });
  }

  componentDidUpdate(oldProps:any, newProps:any) {
    console.log(777);
  }

  public render(): string {
    console.log(333);
    return `
    <div class="list-avatar-container">
        <img src="{{avatar}}" alt="Аватар {{name}}" />
    </div>
    <div class="list-contact-container">
        <p class="card-name">{{name}} </p>
        <div class="card-mess">{{#if mine_message}}<b>Вы: </b>{{/if}}{{lest_message}} </div>
    </div>
    <div class="list-indicators-container">
        <div class="card-date">{{ date }}</div>
        {{#if indicator}}<div class="card-indicator">{{indicator}}</div>{{/if}}
    </div>
    `;
  }
}
