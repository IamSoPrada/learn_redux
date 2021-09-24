import { createStore } from "./redux/store.js";
import {
  addTodoAction,
  toggleTodoAction,
  removeTodoAction,
  addGoalAction,
  removeGoalAction,
} from "./redux/actions.js";

import { app } from "./redux/reducers.js";

window.addEventListener("DOMContentLoaded", () => {
  // Ф-ция генерирует уникальный id
  function generateId() {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }

  const store = createStore(app);

  store.subscribe(() => {
    //console.log("The new state is: ", store.getState());

    const { goals, todos } = store.getState();
    document.getElementById("goals").innerHTML = "";
    document.getElementById("todos").innerHTML = "";
    goals.forEach(addGoalToDOM);
    todos.forEach(addTodoToDOM);
  });

  /*  store.dispatch(
    addTodoAction({
      id: 0,
      name: "Walk the dog",
      complete: false,
    })
  );

  store.dispatch(
    addTodoAction({
      id: 1,
      name: "Wash the car",
      complete: false,
    })
  );

  store.dispatch(removeTodoAction(1));

  store.dispatch(toggleTodoAction(0));

  store.dispatch(
    addGoalAction({
      id: 1,
      name: "Lose 20 pounds",
    })
  );

  store.dispatch(removeGoalAction(0));
 */

  function createRemoveButton(onClick) {
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "X";
    removeBtn.addEventListener("click", onClick);
    return removeBtn;
  }

  function addTodoToDOM(todo) {
    const node = document.createElement("li");
    const text = document.createTextNode(todo.name);

    const removeBtn = createRemoveButton(() => {
      store.dispatch(removeTodoAction(todo.id));
    });
    node.appendChild(text);
    node.appendChild(removeBtn);
    node.style.textDecoration = todo.complete ? "line-through" : "none";
    node.addEventListener("click", () => {
      store.dispatch(toggleTodoAction(todo.id));
    });
    document.getElementById("todos").appendChild(node);
  }

  function addGoalToDOM(goal) {
    const node = document.createElement("li");
    const text = document.createTextNode(goal.name);
    const removeBtn = createRemoveButton(() => {
      store.dispatch(removeGoalAction(goal.id));
    });
    node.appendChild(text);
    node.appendChild(removeBtn);
    document.getElementById("goals").appendChild(node);
  }

  function addTodo() {
    const input = document.getElementById("todo");
    const name = input.value;
    input.value = "";
    store.dispatch(
      addTodoAction({
        id: generateId(),
        name,
        complete: false,
      })
    );
  }

  function addGoal() {
    const input = document.getElementById("goal");
    const name = input.value;
    input.value = "";
    store.dispatch(
      addGoalAction({
        id: generateId(),
        name,
      })
    );
  }

  document.getElementById("todoBtn").addEventListener("click", addTodo);
  document.getElementById("goalBtn").addEventListener("click", addGoal);
});
