import Block from "../../core/block";
import { ListSearch, ListCat, TopChat, MessageBox } from "../../components";
import catsMock from "./mockCats";

export default class ListPage extends Block {
  constructor(props:any) {
    super("div", {
      ...props,
      className: "container",
      Search: new ListSearch({ label: "Почта", name: "email", profile: false }),
      ListCat: new ListCat({ cats: catsMock, onClick: () => {
        let cat = catsMock[this.children.ListCat.getActiveCatIndex()];
        if(cat) {
          this.children.TopChat.setProps({ name: cat.name, avatar: cat.avatar });
        }
      } }),
      TopChat: new TopChat({ name: 'Имя' }),
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
