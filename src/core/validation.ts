import Block from "./block";

function validationConditions(code: string, value: string) {
  let error = null;

  switch (code) {
    case "login":
      if (!/^[A-Za-z\d_-]{3,20}$/.test(value))
        error = "Только буквы, цыфры и -/_. От 3 до 20 символов.";
      else if (/^\d+$/.test(value)) error = "Не может состоять только из цыфр.";
      break;
    case "first_name":
    case "second_name":
      if (!/^[A-ZА-ЯЁ]+[\w-]*$/.test(value))
        error =
          "Первая буква должна быть заглавной, без спецсимволов (только дефис)";
      break;
    case "email":
      if (!/^\w+([.-_]?\w+)@\w+([.-]?\w+)(.\w)$/.test(value))
        error = "Не соответствует формату";
      else if (/[А-ЯЁа-яё]/gi.test(value)) error = "Допустима только латиница";
      break;
    case "password":
      if (!/^.{8,40}$/.test(value))
        error =
          "От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра";
      else if (!/[A-ZА-ЯЁ]/gi.test(value))
        error = "Обязательно хотя бы одна заглавная буква и цифра";
      else if (!/\d/gi.test(value))
        error = "Обязательно хотя бы одна заглавная буква и цифра";
      break;
    case "phone":
      if (!/^(\+{1}\d{9,14})|(\d{10,15})$/.test(value))
        error =
          "От 10 до 15 символов, состоит из цифр, может начинается с плюса.";
      break;
    case "message":
      if (!/^.+$/.test(value)) error = "Не должно быть пустым.";
      break;
  }

  return error;
}

export default function Validation(
  controller: Block,
  target: any,
  alias: string,
  code: string
): string {
  const value = target.value;
  const error = validationConditions(code, value);
  controller.children[alias].setProps({ error });
  if (!error) return "";

  const formState: Record<string, string> = {
    ...controller.props.formState,
  };

  formState[target.getAttribute("name")] = value;
  controller.setProps({ formState });

  return error;
}
