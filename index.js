import { createStore } from "./redux/store.js";
import {
  addTodo,
  toggleTodo,
  removeTodo,
  addGoal,
  removeGoal,
} from "./redux/actions.js";

import { app } from "./redux/reducers.js";

window.addEventListener("DOMContentLoaded", () => {
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
