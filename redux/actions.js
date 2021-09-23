import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  ADD_GOAL,
  REMOVE_GOAL,
} from "./types.js";

// Создаем action creators

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

export function addGoal(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}

export function removeGoal(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}
