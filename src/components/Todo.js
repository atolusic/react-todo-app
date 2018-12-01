import React from "react";
import { Link } from "react-router-dom";

const Todo = ({ todo, dispatch, checkDelete }) => {
  return (
    <tr className="table-active">
      <th scope="row">{todo.id}</th>
      <td>{todo.taskName}</td>
      <td>{todo.createdAt}</td>
      <th>
        <input onChange={e => checkDelete(todo.id)} type="checkbox" />
      </th>
      <th>
        <button
          onClick={() =>
            dispatch({
              type: "SHOW_MODAL",
              modalType: "EDIT_TODO",
              payload: todo
            })
          }
          className="btn btn-sm btn-outline-dark mr-1"
        >
          <i className="fas fa-pencil-alt" />
        </button>
        <Link className="btn btn-sm btn-outline-dark" to={`todos/${todo.id}`}>
          <i className="fas fa-search" />
        </Link>
      </th>
    </tr>
  );
};

export default Todo;
