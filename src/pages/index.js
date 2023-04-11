import { useEffect, useState } from "react";
import Dropdown from "@/components/dropdown";
import ListTodo from "@/components/list-todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/components/layout";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      setTodos(todos);
    }
  }, []);

  const handleStatusChange = (id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index].completed = !newTodos[index].completed;
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleChangeInput = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    if (selectedOption === "all") {
      setFilteredTodos(todos);
    } else if (selectedOption === "completed") {
      setFilteredTodos(todos.filter((todo) => todo.completed));
    } else if (selectedOption === "active") {
      setFilteredTodos(todos.filter((todo) => !todo.completed));
    }
  }, [selectedOption, todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const regex = /^\s+$/;
    if (todo === "" || regex.test(todo)) {
      toast.error("Input is not allowed empty!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      const newTodo = {
        id:
          JSON.parse(localStorage.getItem("todos"))?.slice(-1)[0]?.id + 1 || 1,
        title: todo,
        completed: false,
      };
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  return (
    <MainLayout>
      <div className="container">
        <form className="form-input" onSubmit={handleAddTodo}>
          <input
            className="todo-input"
            value={todo}
            onChange={handleChangeInput}
            placeholder="What will you do today?"
          />
          <button className="add-button" onClick={handleAddTodo} type="submit">
            Add
          </button>
          <ToastContainer />
          <Dropdown
            handleChange={handleDropdownChange}
            value={selectedOption}
          />
        </form>
        <ListTodo
          handleDelete={handleDeleteTodo}
          handleChecked={handleStatusChange}
          todos={filteredTodos}
        />
      </div>
    </MainLayout>
  );
}
