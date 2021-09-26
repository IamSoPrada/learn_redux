const List = (props) => {
  return (
    <ul>
      <li>List</li>
    </ul>
  );
};

const Todos = () => {
  return (
    <div>
      <h1>Список Todos:</h1> <List />
    </div>
  );
};

const Goals = () => {
  return (
    <div>
      <h1>Список Goals:</h1> <List />
    </div>
  );
};

export const App = () => {
  return (
    <div>
      <Todos />
      <Goals />
    </div>
  );
};
