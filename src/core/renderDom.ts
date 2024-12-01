import Block from "./block";

export default function renderDOM(block: Block) {
  const root = document.querySelector("#app");

  root!.innerHTML = "";
  root!.appendChild(block.getContent());
}

export function render(query: string, block: Block): HTMLElement | null {
  const root: HTMLElement | null = document.querySelector(query);
  if (!root) return null;

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount({});

  return root;
}
