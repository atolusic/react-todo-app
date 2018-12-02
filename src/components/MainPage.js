import React, { Component } from "react";
import Spinner from "./Spinner";
import { TinyPagination } from "react-pagination-custom";

import database from "../firebase/firebase";
import Todos from "./Todos";
import Todo from "./Todo";
import { Consumer, Context } from "../context/context";
import Thead from "./Thead";

class MainPage extends Component {
  static contextType = Context;
  state = {
    deleteTodoIds: [],
    selectedPageId: 1
  };

  componentDidMount() {
    const { dispatch } = this.context;
    database
      .ref("todos")
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
          dispatch({ type: "GET_TODOS", payload: todoList });
        }
      })
      .catch(e => console.log(e));
  }

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
      .then(() => {
        dispatch({ type: "DELETE_TODO", payload: deleteTodoIds });
      });
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

  /*********************** PAGINATION ***********************/

  changePage = id => {
    this.setState((prevState, props) => {
      return {
        ...prevState,
        selectedPageId: id
      };
    });
  };

  buttonPageClick = id => {
    let { selectedPageId } = this.state;
    switch (id) {
      case "PRE":
        this.changePage(selectedPageId - 1);
        break;
      case "NEXT":
        this.changePage(selectedPageId + 1);
        break;
      default:
        this.changePage(id);
        break;
    }
  };

  renderBtnNumber = id => {
    return (
      <button
        onClick={this.buttonPageClick.bind(this, id)}
        key={id}
        className="mt-1 btn btn-sm btn-dark"
      >
        {id}
      </button>
    );
  };

  render() {
    const itemPerPage = 5;
    const maxBtnNumbers = 3;
    let todoList = <Spinner />;
    const { deleteTodoIds, selectedPageId } = this.state;
    return (
      <Consumer>
        {value => {
          const { todos, dispatch } = value;
          let listShow = [...todos];
          listShow = listShow.splice(
            (selectedPageId - 1) * itemPerPage,
            itemPerPage
          );
          if (todos.length >= 1) {
            todoList = (
              <table className="table table-hover table-bordered">
                <Thead
                  dispatch={dispatch}
                  deleteTodoIds={deleteTodoIds}
                  todos={todos}
                  deleteTodoHandler={this.deleteTodoHandler}
                />
                <Todos>
                  {listShow.map(todo => (
                    <Todo
                      key={todo.id}
                      dispatch={dispatch}
                      todo={todo}
                      checkDelete={this.checkDelete}
                    />
                  ))}
                </Todos>
              </table>
            );
          }

          return (
            <div className="container">
              <h1 className="mb-5">React TodoApp</h1>
              {todoList}
              <TinyPagination
                total={todos.length}
                selectedPageId={selectedPageId}
                itemPerPage={itemPerPage}
                renderBtnNumber={this.renderBtnNumber}
                maxBtnNumbers={maxBtnNumbers}
                preKey="PRE"
                nextKey="NEXT"
                wrapClass="page-container"
                btnsClass="btns-container"
                counterClass="counter-container"
                counterStyle={{ color: "gray" }}
                spreadClass="spread-container"
                spreadStyle={{ padding: "0 5px" }}
              />
              <button
                onClick={() =>
                  dispatch({
                    type: "SHOW_MODAL",
                    modalType: "ADD_TODO"
                  })
                }
                type="button"
                className="mt-1 btn btn-lg btn-dark"
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
