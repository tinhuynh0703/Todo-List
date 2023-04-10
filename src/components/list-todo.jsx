import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

library.add(faTrashCan);

function ListTodo(props) {
  const { todos, handleChecked, handleDelete } = props;
  return (
    <ul className="list-todo">
      {todos.map((todo, index) => (
        <li key={index} className="card">
          {todo.completed ? (
            <span className="isCompleted">{todo.title}</span>
          ) : (
            <span>{todo.title}</span>
          )}
          <input
            className="checkbox"
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleChecked(todo.id)}
          />
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(todo.id)}
            icon="trash-can"
          />
        </li>
      ))}
    </ul>
  );
}
export default ListTodo;
