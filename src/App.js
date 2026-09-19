import { useEffect, useRef, useReducer } from "react";
import TodosReducer from "./reducers/todosReducer";

import './App.css';


function App() {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(TodosReducer, [], () => {

    const storedTodos = localStorage.getItem("Todos");

    if (!storedTodos) return [];

    try {
      const parsedTodos = JSON.parse(storedTodos);
      const now = Date.now();

      return Array.isArray(parsedTodos)
        ? parsedTodos.map((todo, index) => ({
            ...todo,
            id: todo.id ?? `${now}-${index}`,
          }))
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const handleOnClick = () => {
    const value = inputRef.current.value.trim();

    if (!value) return;

    dispatch({ type: "added", payload: value });
    inputRef.current.value = "";
  };

  const handleItemDone = (id) => {
    dispatch({ type: "toggled", payload: id });
  };

  const handleDeleteItem = (id) => {
    dispatch({ type: "deleted", payload: id });
  };

  return (
    <div className="App">
      <div className="to-do-container">
        <h2>To Do List</h2>

        <ul>
          {todos.map(({ id, text, completed }) => (
            <div className="item" key={id}>
              <li
                className={completed ? "done" : ""}
                onClick={() => handleItemDone(id)}
              >
                {text}
              </li>
              <span onClick={() => handleDeleteItem(id)}>⚔️</span>
            </div>
          ))}
        </ul>
        <input ref={inputRef} placeholder="Enter Item..." />
        <button onClick={handleOnClick}>Add New Task</button>
      </div>
    </div>
  );
}

export default App;
