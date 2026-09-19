const TodosReducer = (currentTodos, action) => {
  switch (action.type) {
    case "added": {
      const text = action.payload.trim();

      if (!text) return currentTodos;

      return [
        ...currentTodos,
        {
          id: Date.now(),
          completed: false,
          text,
        },
      ];
    }

    case "toggled": {
      return currentTodos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    }

    
    case "deleted": {
      return currentTodos.filter((todo) => todo.id !== action.payload);
    }

    default: {
      throw Error("Unknown Action " + action.type);
    }
  }
};

export default TodosReducer;
