import { Typography, Button, Space } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateTodos } from "../services/LocalStorageFething";
import { useTodo } from "../context/TodoContext";
import { toast } from "react-toastify";

const EditTodo = () => {
  const navigate = useNavigate();
  const [currentTask, setCurrentTask] = useState<string>("");
  const { taskList, setTaskList } = useTodo();
  type IDType = {
    id: string;
  };

  const param = useParams() as IDType;
  let id: number = Number(param.id);

  // ===> FETCH TODO FROM LOCALE <===
  useEffect(() => {
    let todos = updateTodos(id);
    setCurrentTask(todos?.task);
  }, []);

  // ===> UPDATE TASK (NOT WORKING) <===
  const updateTask = (
    e: React.FormEvent<HTMLFormElement>,
    task: string,
    id: number
  ) => {
    e.preventDefault();
    let sameTask = taskList.find((tk) => tk.id === id);
    if (sameTask) {
      sameTask.task = task;
      sameTask.id = Math.floor(
        Math.random() * Math.floor(Math.pow(new Date().getMilliseconds(), 5))
      );
      setTaskList([...taskList, sameTask]);
      localStorage.setItem("todos", JSON.stringify([...taskList]));
    }
    toast.success(`Task:${task} updated successful`, {
      position: "top-center",
      autoClose: 1500,
      pauseOnHover: false,
      closeOnClick: true,
      draggable: true,
    });
    navigate("/");
  };

  return (
    <section className="flex justify-center mt-5">
      <div className="border border-green-500 bg-slate-200 w-1/2">
        <Typography.Title
          type="success"
          level={3}
          className="text-center py-2.5"
        >
          Update Todo
        </Typography.Title>
        <form
          className="flex justify-center"
          onSubmit={(e) => updateTask(e, currentTask, id)}
        >
          <div className="form-content w-full">
            <input
              type="text"
              className="border outline-none p-2.5 w-1/2 m-5 rounded-md"
              placeholder="Enter Task..."
              value={currentTask}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCurrentTask(e.target.value)
              }
            />
            <Space>
              <Button
                htmlType="submit"
                type="primary"
                className="w-[10.625rem] bg-red-500"
              >
                Add Task
              </Button>
              <Link to={"/"}>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="w-[10.625rem] bg-green-400"
                >
                  Back
                </Button>
              </Link>
            </Space>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditTodo;
