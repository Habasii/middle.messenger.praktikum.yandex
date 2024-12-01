import Block from "./block";

export interface PropsBlock {
  className?: string;
  setProps?: (nextProps: PropsBlock) => void;
  attrs?: {
    [index: string]: () => void;
  };
  events?: {
    [index: string]: (e?: Event) => void;
  };
  _element?: HTMLElement;
  // formState?: Record<string, string>;
  formState?: {
    [index: string]: string;
  };
  errors?: string[];
  error?: string;
  editPasswrdDialog?: boolean;
  readonly?: boolean;
}

export interface BlockConstructable<P = PropsBlock> {
  new (props: P): Block;
}

export interface cat {
  name: string;
  avatar: string;
  date: string;
  lest_message: string;
  indicator: number;
}

export type propType = string|boolean|Block|PropsBlock|cat|cat[]|(()=>void)|((nextProps: PropsBlock) => void)|string[]|Record<string, Block>|symbol
