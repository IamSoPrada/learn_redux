import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  ADD_GOAL,
  REMOVE_GOAL,
} from "./types.js";

//Ф-ция reducer для массива todos
// Состояние будет пустым массивом по умолчанию

export function todos(state = [], action) {
  // Запись через switch это стандарт редакс сообщества

  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }

  //Запись через else if:

  /*  if (action.type === "ADD_TODO") {
      return state.concat([action.todo]);
    } else if (action.type === "REMOVE_TODO") {
      return state.filter((todo) => todo.id !== action.id);
    } else if (action.type === "TOGGLE_TODO") {
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    } else {
      return state;
    } */
}

//Ф-ция reducer для массива goals
export function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}
