import React from "react";

const Todos = props => {
  const { todos, checkDelete } = props;
  return (
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id} className="table-active">
          <th scope="row">{todo.id}</th>
          <td>{todo.taskName}</td>
          <td>{todo.createdAt}</td>
          <th>
            <input onChange={e => checkDelete(todo.id)} type="checkbox" />
          </th>
        </tr>
      ))}
    </tbody>
  );
};

export default Todos;
