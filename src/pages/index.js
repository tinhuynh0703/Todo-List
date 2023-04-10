import { useEffect, useState } from "react";
import Dropdown from "@/components/dropdown";
import ListTodo from "@/components/list-todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/components/layout";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, title: "Quét nhà", completed: false },
    { id: 2, title: "Giặt đồ", completed: false },
    { id: 3, title: "Phơi quần áo", completed: false },
  ]);
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
    setTodos(newTodos);
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
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
    if (todo === "") {
      toast.error("Input is not allowed empty!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      const newTodo = {
        id: todos.length + 1,
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
