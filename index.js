import { createStore } from "./redux/store.js"; // ипорт хранилища состояния
import {
  addTodoAction,
  toggleTodoAction,
  removeTodoAction,
  addGoalAction,
  removeGoalAction,
} from "./redux/actions.js"; // импорт action creators

import { app } from "./redux/reducers.js"; // импорт ф-ции root reducer app

// State проходит следующий цикл:
//1) Создаем хранилище
//2) Получаем вводимые значения из ui и записываем в state
//3) Рендерим обновленный state обратно DOM

window.addEventListener("DOMContentLoaded", () => {
  // Ф-ция генерирует уникальный id
  function generateId() {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }

  const store = createStore(app); // создаем хранилище (по умолчанию state это пустой объект с полями goals и todo, кот. по умолчанию пустые массивы)

  store.subscribe(() => {
    // На каждое обновление состояния мы "обнуляем" дом и рендерим снова массивы полей
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

  // Ф-ция генерирует и добавляет кнопку удаления

  function createRemoveButton(onClick) {
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "X";
    removeBtn.addEventListener("click", onClick);
    return removeBtn;
  }

  // Ф-ции добавляют эл-т li в ul

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
      store.dispatch(toggleTodoAction(todo.id)); // По клику диспатчим нужное событие
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

  //Ф-ция олучаем значение из input и добавляем в state по нужному полю
  //Далее ф-ция subscribe рендерит обновленный state в DOM
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

  //По клику добавляем новый todo или goal в state
  document.getElementById("todoBtn").addEventListener("click", addTodo);
  document.getElementById("goalBtn").addEventListener("click", addGoal);
});
