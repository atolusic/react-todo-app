import React from "react";

import { Consumer } from "../context/context";

class Todos extends React.Component {
  render() {
    const { checkDelete, todos } = this.props;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <tbody>
              {todos.map(todo => (
                <tr key={todo.id} className="table-active">
                  <th scope="row">{todo.id}</th>
                  <td>{todo.taskName}</td>
                  <td>{todo.createdAt}</td>
                  <th>
                    <input
                      onChange={e => checkDelete(todo.id)}
                      type="checkbox"
                    />
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
                    <button className="btn btn-sm btn-outline-dark">
                      <i className="fas fa-search" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          );
        }}
      </Consumer>
    );
  }
}

export default Todos;
