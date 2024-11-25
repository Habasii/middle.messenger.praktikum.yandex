import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import renderDOM from "./core/renderDom";

import cat1 from './assets/01.jpg'
import cat2 from './assets/02.jpg'
import cat3 from './assets/03.jpg'

const pages = {
  'login': [ Pages.LoginPage ],
  'auth': [ Pages.AuthPage ],
  'profile': [ Pages.ProfilePage, { readonly: true } ],
  'profile-edit': [ Pages.ProfilePage ],
  'profile-edit-password': [ Pages.ProfilePage, { readonly: true, editPasswrdDialog: true } ],
  'profile-edit-avatar': [ Pages.ProfilePage, { readonly: true, editAvatarDialog: true } ],
  'error-404': [ Pages.ErrorPage, { code: '404', comment: 'Страница не найдена.' } ],
  'error-500': [ Pages.ErrorPage, { code: '500', comment: 'Внутренняя ошибка сервера.' } ],
  'list': [ Pages.ListPage, { showDialog: true }],
  'nav': [ Pages.NavigatePage ]
};

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  if (typeof source === "function") {
    renderDOM(new source({}));
    return;
  }

  const container = document.getElementById("app")!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
