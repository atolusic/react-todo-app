import React, { Component } from "react";
import uniqid from "uniqid";
import moment from "moment";
import database from "../firebase/firebase";
import Spinner from "./Spinner";

import AddTodo from "./AddTodo";
import Todos from "./Todos";

class MainPage extends Component {
  state = {
    open: false,
    todos: []
  };

  componentDidMount() {
    database
      .ref(`todos`)
      .once("value")
      .then(snapshot => {
        const todos = snapshot.val();
        if (todos) {
          const todoList = [];
          for (const key in todos) {
            todoList.push({
              id: key,
              ...todos[key]
            });
          }
          this.setState({ todos: todoList });
        }
      });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  checkDelete = id => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id
          ? Object.assign(todo, { checkDelete: !todo.checkDelete })
          : todo
      )
    }));
  };

  addTodo = (e, todoData, onClose) => {
    e.preventDefault();
    const { taskName, desc, id } = todoData;
    const saveData = {
      taskName,
      desc,
      createdAt: moment().format("MMMM Do YYYY, h:mma"),
      checkDelete: false
    };

    if (id) {
      this.setState(
        prevState => ({
          todos: prevState.todos.map(todo =>
            todo.id === id ? Object.assign(todo, saveData) : todo
          )
        }),
        () => {
          onClose();
        }
      );
    } else {
      database
        .ref(`todos`)
        .push(saveData)
        .then(ref =>
          this.setState({
            todos: [...this.state.todos, { id: ref.key, ...saveData }]
          })
        );
    }
  };

  deleteTodoHandler = () => {
    const { todos } = this.state;
    const updates = {};
    todos.forEach(todo => {
      if (todo.checkDelete) {
        updates[todo.id] = null;
      }
    });
    database
      .ref(`todos`)
      .update(updates)
      .then(() =>
        this.setState({
          todos: todos.filter(todo => !todo.checkDelete)
        })
      );
  };

  render() {
    const { open, todos } = this.state;
    let todoList = <Spinner />;
    console.log(todoList);
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
                    onClick={this.deleteTodoHandler}
                    disabled={todos.every(todo => !todo.checkDelete)}
                    className="btn btn-sm btn-outline-dark"
                  >
                    <i className="fas fa-trash" />
                  </button>
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <Todos
              addTodo={this.addTodo}
              open={open}
              onClose={this.onCloseModal}
              checkDelete={this.checkDelete}
              todos={todos}
            />
          </table>
          <button
            onClick={this.onOpenModal}
            type="button"
            className="mt-3 btn btn-lg btn-dark"
          >
            Add Todo
          </button>
        </div>
      );
    }
    return (
      <div className="container">
        <h1 className="mb-5">React TodoApp</h1>
        {todoList}
        <AddTodo
          add
          open={open}
          onClose={this.onCloseModal}
          addTodo={this.addTodo}
        />
      </div>
    );
  }
}

export default MainPage;
