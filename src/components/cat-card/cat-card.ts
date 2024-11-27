import { ButtonLink, Input } from "..";
import Block from "../../core/block";

export default class CatCard extends Block {
  constructor(props:any) {
    super("div", {
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  public render(): string {
    return `
    <div class="card {{#if active}}card_active{{/if}}">
      <div class="list-avatar-container">
          <img src="{{avatar}}" alt="Аватар {{name}}" />
      </div>
      <div class="list-contact-container">
          <p class="card-name">{{name}} </p>
          <div class="card-mess">{{#if mine_message}}<b>Вы: </b>{{/if}}{{lest_message}} </div>
      </div>
      <div class="list-indicators-container">
          <div class="card-date">{{ date }}</div>
          {{#if active}}
          {{else}}
          {{#if indicator}}<div class="card-indicator">{{indicator}}</div>{{/if}}
          {{/if}}
      </div>
    </div>
    `;
  }
}