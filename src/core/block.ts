import EventBus from "./eventBus";
import { nanoid } from "nanoid";
import Handlebars from "handlebars";
import { PropsBlock } from "./types";

export default abstract class Block {
  static EVENTS: {
    INIT: string;
    FLOW_CDM: string;
    FLOW_CDU: string;
    FLOW_RENDER: string;
  } = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  _element: HTMLElement;
  _meta: {
    tagName: string;
    props: PropsBlock;
  };
  _id: string = nanoid(6);
  id: string;
  eventBus: () => EventBus<string>;
  children: {
    [index: string]: Block;
  };
  props: PropsBlock;
  className?: string = "";
  formState?: {
    [index: string]: string;
  } = {};

  constructor(tagName: string = "div", propsWithChildren: PropsBlock) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this.id = this._id;
    this._element = document.createElement(tagName);

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus<string>): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(): void {
    const { tagName, props } = this._meta;

    this._element = this._createDocumentElement(tagName);

    if (typeof props.className === "string") {
      const classes: string[] = props.className.split(" ");
      this._element.classList.add(...classes);
    }

    if (typeof props.attrs === "object") {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        this._element.setAttribute(attrName, attrValue);
      });
    }
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _getChildrenAndProps(propsAndChildren: PropsBlock): {
    children: { [index: string]: Block };
    props: PropsBlock;
  } {
    const children: { [index: string]: Block } = {};
    const props = {};

    Object.keys(propsAndChildren).forEach((key: string) => {
      const value = propsAndChildren[key];
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });

        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _componentDidMount(oldProps: PropsBlock): void {
    this.componentDidMount(oldProps);
  }

  componentDidMount(oldProps: PropsBlock): void {
    if (typeof oldProps === "string") console.log(oldProps);
  }

  dispatchComponentDidMount(oldProps: PropsBlock): void {
    if (typeof oldProps === "string") console.log(oldProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: PropsBlock, newProps: PropsBlock): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: PropsBlock, newProps: PropsBlock): boolean {
    if (typeof oldProps === "string") console.log(oldProps);
    if (typeof newProps === "string") console.log(newProps);
    return true;
  }

  setProps = (nextProps: PropsBlock): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _compile(): HTMLElement {
    const propsAndStubs: Record<string, PropsBlock> = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map((component) => `<div data-id="${component._id}"></div>`)
          .join("");
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment: HTMLElement = this._createDocumentElement("template");
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(
            `[data-id="${component._id}"]`
          );

          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  _render(): void {
    this._removeEvents();
    const block = this._compile();

    if (!this._element) return;

    if (this._element.children.length === 0) {
      this._element.appendChild(block);
    } else {
      this._element.replaceChildren(block);
    }

    this._addEvents();
  }

  render(): string {
    return "";
  }

  getContent(): HTMLElement | undefined {
    return this.element;
  }

  _makePropsProxy(props: {
    [key: string]: PropsBlock;
  }): ProxyHandler<{ [key: string]: PropsBlock }> {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props as PropsBlock, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value: PropsBlock) {
        const oldTarget = { ...target };
        target[prop] = value;

        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent()!.style.display = "block";
  }

  hide(): void {
    this.getContent()!.style.display = "none";
  }
}
