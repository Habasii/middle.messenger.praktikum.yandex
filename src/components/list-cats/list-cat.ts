import { ButtonLink, Input } from "..";
import Block from "../../core/block";
import { CatCard } from "../cat-card";

export default class ListCat extends Block {
  constructor(props:any) {
    super("div", {
      ...props,
      activeCatIndex: -1,
      // RemoveCatDialog: new RemoveCatDialog({
      //   onOk: () => this.setProps({ showDialog: false }),
      // }),
      cats: props.cats.map(
        (props:any, index:any) =>
          new CatCard({
            ...props,
            onClick: () => {
              this.setProps({ activeCatIndex: index });
            },
            onRemove: (cat:any) => {
              this.setProps({ showDialog: true });
            },
          }),
      ),
    });
  }

  componentDidUpdate(oldProps:any, newProps:any) {
    const { activeCatIndex } = this.props;
    const { cats } = this.children;
    console.log(activeCatIndex);

    cats.forEach((cat:any, index:any) => {
      if (index === activeCatIndex) {
        cat.setProps({ active: true });
        return;
      }

      if (cat.props.active) {
        cat.setProps({ active: false });
      }
    });

    return true;
  }

  public render(): string {
    return `
    <ul class="list-contacts">
        {{#each cats}}
            {{{ this }}}
        {{/each}}
    </ul>
    `;
  }
}
