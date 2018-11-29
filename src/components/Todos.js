import React from "react";
import AddTodo from "./AddTodo";

class Todos extends React.Component {
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { checkDelete, todos } = this.props;

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
            <th>
              <button
                onClick={this.onOpenModal}
                className="btn btn-sm btn-outline-dark mr-1"
              >
                <i className="fas fa-pencil-alt" />
              </button>
              <button className="btn btn-sm btn-outline-dark">
                <i className="fas fa-search" />
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default Todos;
