import Block from "../../core/block";
import { ListSearch, ListCat, TopChat, MessageBox } from "../../components";

export default class ListPage extends Block {
  constructor(props:any) {
    // let active_cat = props.cats.find(c => c.active);
    super("div", {
      ...props,
      className: "container",
      Search: new ListSearch({ label: "Почта", name: "email" }),
      ListCat: new ListCat({ cats: props.cats }),
      TopChat: new TopChat({ name: 'Имя'/*active_cat.name*/ }),
      MessageBox: new MessageBox({}),
    });
  }
  public render(): string {
    return `
        <div class="list-left-block">
            <div class="list-search">{{{ Search }}}</div>
            <div class="list-contacts-container">{{{ ListCat }}}</div>
        <div class=""></div>
        </div>
        <div class="list-right-block">
            {{{ TopChat }}}
            <div class="chat"></div>
            <div class="message">{{{ MessageBox }}}</div>
        </div>
    `;
  }
}
