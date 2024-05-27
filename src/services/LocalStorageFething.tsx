import { TaskListInterface } from "../interface/Todo";

// ===> GET ALL TODOS FROM STORAGE <===
export const getTodosFromLocale = () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    return JSON.parse(storedTodos);
  } else {
    console.log("No todos found in local storage.");
    return [];
  }
};

export const updateTodos = (id: number) => {
  let localeTodos = getTodosFromLocale();
  return Array.isArray(localeTodos)
    ? localeTodos.find((item: TaskListInterface) => item.id == id)
    :   [];
};
