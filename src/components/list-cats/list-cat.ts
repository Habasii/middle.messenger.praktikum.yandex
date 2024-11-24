import { ButtonLink, Input } from "..";
import Block from "../../core/block";

export default class ListCat extends Block {
  constructor(props:any) {
    super("div", {
      ...props,
      // Card: new ButtonLink({
      //   cats: props.cats,
      // }),
    });
  }
  public render(): string {
    return 'котики';
    // return `
    // <ul class="list-contacts">
    //     {{#each cats}}
    //         {{{ Card }}}
    //     {{/each}}
    // </ul>
    // `;
  }
}
