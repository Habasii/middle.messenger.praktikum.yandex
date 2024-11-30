import Block from "../../core/block";
import { CatCard } from "../cat-card";
import { PropsBlock } from "../../core/types";

interface cat {
  name: string;
  avatar: string;
  date: string;
  lest_message: string;
  indicator: number;
}

interface ListCatProps extends PropsBlock {
  activeCatIndex: number;
  active: boolean;
  cats: cat[];
  onClick: () => void;
  showDialog: boolean;
}

export default class ListCat extends Block {
  constructor(props: ListCatProps) {
    super("div", {
      ...props,
      activeCatIndex: -1,
      events: {
        click: props.onClick,
      },
      cats: props.cats.map(
        (catProps: cat, index: number) =>
          new CatCard({
            ...catProps,
            onClick: () => {
              this.setProps({ activeCatIndex: index });
              this.setProps({ active: true });
            },
            onRemove: () => {
              this.setProps({ showDialog: true });
            },
          })
      ),
    });
  }

  getActiveCatIndex() {
    const { activeCatIndex } = this.props;
    return activeCatIndex;
  }

  componentDidUpdate(oldProps: ListCatProps, newProps: ListCatProps) {
    if (typeof oldProps == "string") console.log(oldProps);
    if (typeof newProps == "string") console.log(newProps);
    const { activeCatIndex } = this.props;
    const { cats } = this.children;

    cats.forEach((cat: Block, index: number) => {
      if (index === activeCatIndex) {
        cat.setProps({ active: true });
        cat.setProps({ className: "card card-active" });
      } else if (cat.props.active) {
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
