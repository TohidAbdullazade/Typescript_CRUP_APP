import { Button, Input, InputRef, Modal, Space, Table, Tooltip } from "antd";
import { useTodo } from "../context/TodoContext";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getTodosFromLocale } from "../services/LocalStorageFething";
import { IoIosSearch } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoTask = () => {
  const { taskList, setTaskList } = useTodo();
  const idInputRef = useRef<InputRef>(null);
  const taskInputRef = useRef<InputRef>(null);

  // ===> FETCH ALL TODOS FROM LOCALE AND SHOW IN THE UI <===
  useEffect(() => {
    let todos = getTodosFromLocale();
    setTaskList(todos);
  }, [setTaskList]);

  // ===> DELETE TASK <===
  const deleteTodo = (id: number, task: string) => {
    Modal.confirm({
      title: `Would you Delete Task: ${
        task.substring(0, 1).toUpperCase() + task.slice(1)
      }`,
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: {
        style: { background: "red", color: "white" },
      },
      cancelButtonProps: {
        style: { background: "green", color: "white" },
      },
      onOk: () => {
        let removeTodo = taskList.filter((task) => task.id !== id);
        setTaskList(removeTodo);
        localStorage.setItem("todos", JSON.stringify(removeTodo));
        toast.error(`${task} deleted`, {
          position: "top-center",
          autoClose: 2000,
          draggable: true,
          pauseOnHover: false,
          closeOnClick: true,
        });
      },
      onCancel: () => {
        return;
      },
    });
  };

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <Table
        className="w-[70%] my-5"
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            filterDropdown: ({ selectedKeys, confirm, setSelectedKeys }) => {
              return (
                <Input
                  ref={idInputRef}
                  autoFocus // Input-a autoFocus əlavə edirik
                  value={selectedKeys[0]}
                  onChange={(e) => {
                    setSelectedKeys(e.target.value ? [e.target.value] : []);
                    confirm({ closeDropdown: false });
                  }}
                  placeholder="Search by Id..."
                  onPressEnter={() => {
                    confirm();
                  }}
                  onBlur={() => {
                    confirm();
                  }}
                ></Input>
              );
            },
            filterIcon: () => {
              return (
                <Tooltip color="green" title="Search by id" trigger={"hover"}>
                  <IoIosSearch size={23} color="#4ade80" />
                </Tooltip>
              );
            },
            onFilter: (value, record) => {
              return String(record.id).startsWith(value.toString());
            },
          },
          {
            title: "Task",
            dataIndex: "task",
            filterDropdown: ({ selectedKeys, confirm, setSelectedKeys }) => {
              return (
                <Input
                  ref={taskInputRef}
                  value={selectedKeys[0]}
                  onChange={(e) => {
                    setSelectedKeys(e.target.value ? [e.target.value] : []);
                    confirm({ closeDropdown: false });
                  }}
                  placeholder="Search by Task..."
                  onPressEnter={() => {
                    confirm();
                  }}
                  onBlur={() => {
                    confirm();
                  }}
                ></Input>
              );
            },
            filterIcon: () => {
              return (
                <Tooltip
                  color="red"
                  title="Search by Taskname"
                  trigger={"hover"}
                >
                  <IoIosSearch size={23} color="#4ade80" />
                </Tooltip>
              );
            },
            onFilter: (value, record) => {
              let vl = String(value);
              return record.task.toLowerCase().includes(vl.toLowerCase());
            },
          },
          {
            title: "Actions",
            render: (_, { id, task }) => {
              return (
                <Space>
                  <Tooltip color="green" title="Edit" trigger={"hover"}>
                    <Link to={`/update/${id}`}>
                      <Button className="w-full">
                        <FaRegEdit size={22} color="green" />
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip color="red" title="Delete" trigger={"hover"}>
                    <Button onClick={() => deleteTodo(id, task)}>
                      <MdDeleteOutline color="red" size={22} />
                    </Button>
                  </Tooltip>
                </Space>
              );
            },
          },
        ]}
        pagination={{ pageSize: 10 }}
        dataSource={taskList.map((item) => ({ ...item, key: item.id }))}
      ></Table>
      <ToastContainer />
    </div>
  );
};

export default TodoTask;
