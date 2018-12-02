import React, { Component } from "react";
import database from "../firebase/firebase";
import { Link } from "react-router-dom";

import Spinner from "./Spinner";
import { Consumer, Context } from "../context/context";

class TodoDetails extends Component {
  static contextType = Context;

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const { dispatch, todos } = this.context;
    if (id) {
      const todo = todos.find(todo => todo.id === id);
      if (!todo) {
        database
          .ref(`todos/${id}`)
          .once("value")
          .then(snapshot => {
            const todo = snapshot.val();
            if (todo) {
              dispatch({ type: "GET_TODO", payload: { id, ...todo } });
            }
          })
          .catch(e => console.log(e));
      }
    }
  }

  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const flexStyles = {
      container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    };
    return (
      <div className="jumbotron jumbotron-fluid">
        <Consumer>
          {value => {
            const { dispatch, todos } = value;
            let renderTodo = <Spinner />;
            const todo = todos.find(todo => todo.id === id);
            if (todos.length >= 1 && todo) {
              renderTodo = (
                <div
                  className="container text-left"
                  style={flexStyles.container}
                >
                  <div>
                    <Link to="/" className="btn btn-sm btn-secondary mb-3">
                      Back to dashboard
                    </Link>
                    <h1 className="display-5">{todo.taskName}</h1>
                    <p className="font-italic">Created at: {todo.createdAt}</p>
                    <p className="lead">{todo.desc}</p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "SHOW_MODAL",
                          modalType: "DELETE_TODO_POPUP",
                          deleteTodoDetails: {
                            ids: [id],
                            redirect: { fn: () => this.props.history.push("/") }
                          }
                        })
                      }
                      className="btn btn-secondary"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "SHOW_MODAL",
                          modalType: "EDIT_TODO",
                          payload: todo,
                          editTodoDetailsPage: true
                        })
                      }
                      className="btn ml-1 btn-secondary"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            }
            return renderTodo;
          }}
        </Consumer>
      </div>
    );
  }
}

export default TodoDetails;
