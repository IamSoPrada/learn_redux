window.addEventListener("DOMContentLoaded", () => {
  // Создание хранилища (store) состояния

  function createStore(reducer) {
    // Хранилище store должно содерать следующее:

    // 1. Состояние state
    // 2. Метод получения состояния getState
    // 3. Следить за изменениями дерева состояния Ф-ция subscribe
    // 4. Метод обновления состояния Ф-ция dispatch

    // Как только мы вызывам createStore, ф-ция возвращает нам акутальный store

    let state; //Состояние будет undefined в самом начале
    let listeners = []; // это будет массив функций слушателей которые следят за изменением состояния
    const getState = () => state;

    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    };

    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener()); // Проходим по массиву слушателей и вызываем каждый из них
    };

    return {
      getState,
      subscribe,
      dispatch,
    };
  }

  //Типы действий записанные в константы:

  const ADD_TODO = "ADD_TODO";
  const REMOVE_TODO = "REMOVE_TODO";
  const TOGGLE_TODO = "TOGGLE_TODO";
  const ADD_GOAL = "ADD_GOAL";
  const REMOVE_GOAL = "REMOVE_GOAL";

  // Создаем action creators

  function addTodo(todo) {
    return {
      type: ADD_TODO,
      todo,
    };
  }

  function toggleTodo(id) {
    return {
      type: TOGGLE_TODO,
      id,
    };
  }

  function removeTodo(id) {
    return {
      type: REMOVE_TODO,
      id,
    };
  }

  function addGoal(goal) {
    return {
      type: ADD_GOAL,
      goal,
    };
  }

  function removeGoal(id) {
    return {
      type: REMOVE_GOAL,
      id,
    };
  }

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

  function app(state = {}, action) {
    return {
      todos: todos(state.todos, action),
      goals: goals(state.goals, action),
    };
  }

  const store = createStore(app);

  store.subscribe(() => {
    console.log("The new state is: ", store.getState());
  });

  store.dispatch(
    addTodo({
      id: 0,
      name: "Walk the dog",
      complete: false,
    })
  );

  store.dispatch(
    addTodo({
      id: 1,
      name: "Wash the car",
      complete: false,
    })
  );

  store.dispatch(
    addTodo({
      id: 2,
      name: "Go to the gym",
      complete: true,
    })
  );

  store.dispatch(removeTodo(1));

  store.dispatch(toggleTodo(0));

  store.dispatch(
    addGoal({
      id: 0,
      name: "Learn Redux",
    })
  );

  store.dispatch(
    addGoal({
      id: 1,
      name: "Lose 20 pounds",
    })
  );

  store.dispatch(removeGoal(0));
});
