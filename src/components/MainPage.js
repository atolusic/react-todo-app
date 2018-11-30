import React, { Component } from "react";
import Spinner from "./Spinner";

import database from "../firebase/firebase";
import Todos from "./Todos";
import { Consumer } from "../context/context";

class MainPage extends Component {
  state = {
    deleteTodoIds: []
  };
  deleteTodoHandler = (e, todos, dispatch) => {
    const { deleteTodoIds } = this.state;
    const updates = {};
    todos.forEach(todo => {
      if (deleteTodoIds.includes(todo.id)) {
        updates[todo.id] = null;
      }
    });
    database
      .ref(`todos`)
      .update(updates)
      .then(() => dispatch({ type: "DELETE_TODO", payload: deleteTodoIds }));
  };

  checkDelete = id => {
    const { deleteTodoIds } = this.state;
    let todos = [...deleteTodoIds];

    if (deleteTodoIds.includes(id)) {
      todos = todos.filter(todo => todo !== id);
    } else {
      todos = [...todos, id];
    }

    this.setState({
      deleteTodoIds: todos
    });
  };

  render() {
    let todoList = <Spinner />;
    const { deleteTodoIds } = this.state;
    return (
      <Consumer>
        {value => {
          const { todos, dispatch } = value;
          if (todos.length >= 1) {
            todoList = (
              <div>
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr className="table-active">
                      <th scope="col">ID</th>
                      <th scope="col">Task name</th>
                      <th scope="col">Created at</th>
                      <th scope="col">
                        <button
                          onClick={e =>
                            this.deleteTodoHandler(e, todos, dispatch)
                          }
                          disabled={deleteTodoIds.length < 1}
                          className="btn btn-sm btn-outline-dark"
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <Todos checkDelete={this.checkDelete} todos={todos} />
                </table>
              </div>
            );
          }

          return (
            <div className="container">
              <h1 className="mb-5">React TodoApp</h1>
              {todoList}
              <button
                onClick={() =>
                  dispatch({
                    type: "SHOW_MODAL",
                    modalType: "ADD_TODO"
                  })
                }
                type="button"
                className="mt-3 btn btn-lg btn-dark"
              >
                Add Todo
              </button>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default MainPage;
