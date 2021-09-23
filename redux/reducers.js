import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  ADD_GOAL,
  REMOVE_GOAL,
} from "./types.js";

//Ф-ция reducer для массива todos
// Состояние будет пустым массивом по умолчанию

function todos(state = [], action) {
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
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

// Хранилеще состояния будем иметь такой вид, т.к у нас в состоянии
// будут храниться массив todos и goals:

/* {
    todos: [],
    goals: []
  } */

//Поэтому необходимо создать корневую ф-цию root reducer для всех массивов
//которые будут в нашем состоянии и для каждого из них мы будем вызывать его собственную
//ф-цию reducer которая будет обновлять наше состояние

export function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}
