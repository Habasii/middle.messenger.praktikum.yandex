import { ButtonLink, Input } from "..";
import Block from "../../core/block";

export default class CatCard extends Block {
  constructor(props:any) {
    super("div", {
      ...props,
      className: `card ${props.active ? 'card_active' : ''}`,
      // Card: new ButtonLink({
      //   cats: props.cats,
      // }),
    });
  }
  public render(): string {
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
