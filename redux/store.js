// Создание хранилища (store) состояния

export function createStore(reducer) {
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
