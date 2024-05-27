import { Button, Typography, message } from "antd";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useTodo } from "../context/TodoContext";

const Form = () => {
  const { text, setText, taskList, setTaskList } = useTodo();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // ===> AUTOFOCUS THE INPUT WHEN PAGE RENDER <==
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ===> ADD TODO TASK <===
  const addTodoTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let time =
      Math.floor(Math.random() * 100) *
      new Date().getMilliseconds() *
      new Date().getDate();
    let newTask = {
      id: time,
      task: text.trim(),
    };

    // ===> CHECK FOR DUPLICATED TASKS <===
    const existTask = taskList.some(
      (tk) =>
        tk.task.toLowerCase().replace(/\s/g, "") ===
        newTask.task.toLowerCase().replace(/\s/g, "")
    );
    if (existTask) {
      message.error(
        `Task ${text.charAt(0).toUpperCase() + text.slice(1)} already exists`,
        2
      );
      return;
    } else {
      setTaskList([...taskList, newTask]);
      localStorage.setItem("todos", JSON.stringify([...taskList, newTask]));
      setText("");
      message.success(
        `Task: ${
          newTask.task.substring(0, 1).toUpperCase() + newTask.task.slice(1)
        } Added succesful`,
        3
      );
    }
  };

  return (
    <section className="flex justify-center mt-5">
      <div className="border border-green-500 bg-slate-200 w-1/2">
        <Typography.Title
          type="success"
          level={3}
          className="text-center py-2.5"
        >
          Todo List
        </Typography.Title>
        <form className="flex justify-center" onSubmit={addTodoTask}>
          <div className="form-content w-full">
            <input
              type="text"
              className="border outline-none p-2.5 w-1/2 m-5 rounded-md"
              placeholder="Enter Task..."
              ref={inputRef}
              value={text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
            />
            <Button
              ref={buttonRef}
              disabled={!text || text.trim().length < 3 || text.startsWith(" ")}
              htmlType="submit"
              type="primary"
              className={`${
                !text.trim() || text.trim().length < 3
                  ? "cursor-not-allowed"
                  : ""
              } bg-red-400 text-white rounded-md border-0 w-[44%] h-1/2`}
            >
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
