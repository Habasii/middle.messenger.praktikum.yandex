function GoTo(page: string): void {
  const div = document.createElement("div");
  div.setAttribute("page", page);
  document.body.append(div);
  div.click();
  div.remove();
}

export { GoTo };
