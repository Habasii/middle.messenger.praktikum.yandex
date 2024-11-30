import Block from "../../core/block";
import { CatCard } from "../cat-card";

interface ListCatProps extends Block {
  activeCatIndex: number;
  active: boolean;
  cats: {
    onClick: () => void;
    onRemove: () => void;
  }[];
  onClick: () => void;
  showDialog: boolean;
}

export default class ListCat extends Block {
  constructor(props: any) {
    super("div", {
      ...props,
      activeCatIndex: -1,
      events: {
        click: props.onClick,
      },
      cats: props.cats.map(
        (props: any, index: number) =>
          new CatCard({
            ...props,
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
    if(typeof(oldProps) == 'string') console.log(oldProps);
    if(typeof(newProps) == 'string') console.log(newProps);
    const { activeCatIndex } = this.props;
    const { cats } = this.children;

    cats.forEach((cat: any, index: number) => {
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
