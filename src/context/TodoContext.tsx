import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  SetStateAction,
  useState,
} from "react";
import { TaskListInterface } from "../interface/Todo";

interface GlobalInterfaces {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  taskList: TaskListInterface[];
  setTaskList: Dispatch<SetStateAction<TaskListInterface[]>>;
}

interface TodoContextProviderProps {
  children: ReactNode;
}

const TodoContext = createContext<GlobalInterfaces | null>(null);

export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [text, setText] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskListInterface[]>([]);

  return (
    <TodoContext.Provider value={{ text, setText, taskList, setTaskList }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoContextProvider");
  }
  return context;
};
