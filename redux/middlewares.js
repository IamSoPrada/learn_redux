import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  ADD_GOAL,
  REMOVE_GOAL,
} from "./types.js";

/* export function checker() {
  return function (next) {
    return function (action) {
      if (
        action.type === ADD_TODO &&
        action.todo.name.toLowerCase().indexOf("bitcoin") !== -1
      ) {
        return alert("Nope. That's a bad idea.");
      }

      if (
        action.type === ADD_GOAL &&
        action.goal.name.toLowerCase().indexOf("bitcoin") !== -1
      ) {
        return alert("Nope. That's a bad idea.");
      }

      return next(action);
    };
  };
} */

// Middlewares предоставляют стороннюю точку расширения, между
// отправкой экшена и моментом, когда этот экшен достигает редюсера.
// Люди используют Redux-мидлвары для логирования,
// сообщения об ошибках, общения с асинхронным API, роутинга и т.д.

// Ф-ция checker проверят содержится ли слово "bitcoin" в отпрвляемом в state значинии input
// Если да, то появляется alert и действие прерывается.
export const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().indexOf("bitcoin") !== -1
  ) {
    return alert("Давай нет!");
  }

  if (
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().indexOf("bitcoin") !== -1
  ) {
    return alert("Забудь про биток, брат...");
  }

  return next(action);
};
