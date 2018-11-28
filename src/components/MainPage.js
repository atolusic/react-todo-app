import React, { Component } from "react";
import Modal from "react-responsive-modal";
import uniqid from "uniqid";
import moment from "moment";

import AddTodo from "./AddTodo";
import Todos from "./Todos";

class MainPage extends Component {
  state = {
    open: false,
    todos: [],
    disableDelete: true
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  toggleDeleteHandler = () => {
    const { todos } = this.state;
    todos.forEach(todo =>
      todo.checkDelete
        ? this.setState({ disableDelete: false })
        : this.setState({ disableDelete: true })
    );
  };

  checkDelete = id => {
    this.setState(
      prevState => ({
        todos: prevState.todos.map(todo =>
          todo.id === id
            ? Object.assign(todo, { checkDelete: !todo.checkDelete })
            : todo
        )
      }),
      this.toggleDeleteHandler
    );
  };

  addTodo = (e, todoData) => {
    e.preventDefault();
    const { taskName, desc } = todoData;

    const saveData = {
      id: uniqid(),
      taskName,
      desc,
      createdAt: moment().format("MMMM Do YYYY, h:mma"),
      checkDelete: false
    };
    this.setState(
      {
        todos: [...this.state.todos, saveData]
      },
      () => this.onCloseModal()
    );
  };

  deleteTodoHandler = () => {
    const { todos } = this.state;
    const filteredTodos = todos.filter(todo => !todo.checkDelete);
    this.setState(
      {
        todos: filteredTodos
      },
      () => {
        if (this.state.todos.length < 1) {
          this.setState({ disableDelete: true });
        }
        this.toggleDeleteHandler();
      }
    );
  };

  render() {
    const { open, todos, disableDelete } = this.state;
    return (
      <div className="container">
        <h1 className="mb-5">React TodoApp</h1>
        <table className="table table-hover table-bordered">
          <thead>
            <tr className="table-active">
              <th scope="col">ID</th>
              <th scope="col">Task name</th>
              <th scope="col">Created at</th>
              <th scope="col">
                <button
                  onClick={this.deleteTodoHandler}
                  disabled={disableDelete}
                  className="btn btn-sm btn-outline-dark"
                >
                  <i className="fas fa-trash" />
                </button>
              </th>
            </tr>
          </thead>
          <Todos checkDelete={this.checkDelete} todos={todos} />
        </table>
        <button
          onClick={this.onOpenModal}
          type="button"
          className="mt-3 btn btn-lg btn-dark"
        >
          Add Todo
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <AddTodo addTodo={this.addTodo} />
        </Modal>
      </div>
    );
  }
}

export default MainPage;
