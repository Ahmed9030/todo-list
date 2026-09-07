import { useRef, useState } from "react";

import './App.css';


function App() {
  const inputRef = useRef();
  const [todos ,  setTodos] = useState([]);


  const handleOnClick = () => {
    const text = inputRef.current.value;
    
    if(text){

      const newItem = {completed: false , text}
      setTodos([...todos , newItem]);
      inputRef.current.value = '';
    }
  }

  const handleItemDone = (index) => {
      const new_to_do = [...todos]
      new_to_do[index].completed = !new_to_do[index].completed;

      setTodos(new_to_do);
      console.log(new_to_do);
      
  }

  const handleDeletItem = (index) => {
    const newItems = [...todos];
    newItems.splice(index,1);
    setTodos(newItems)
  }

  return (
    <div className="App">
     <div className="to-do-container">
      <h2>To Do List</h2>

     <ul>
      {todos.map(({text , completed} , index) => {
        return <div className="item">
              <li className={completed ? "done" : ""} key={index} onClick={() => handleItemDone(index)}  > {text}</li>
              <span key={index} onClick={() => handleDeletItem(index)}>⚔️</span>
              </div>
      })}
      
     </ul>
     <input ref={inputRef} placeholder="Enter Item..." />
     <button onClick={handleOnClick}>Add New Task</button>
     </div>
    </div>
  );
}

export default App;
