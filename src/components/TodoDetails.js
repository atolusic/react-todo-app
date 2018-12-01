import React, { Component } from "react";
import database from "../firebase/firebase";

import Spinner from "./Spinner";
import { Consumer } from "../context/context";

class TodoDetails extends Component {
  state = {
    todo: null
  };
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    if (id) {
      database
        .ref(`todos/${id}`)
        .once("value")
        .then(snapshot => {
          const todo = snapshot.val();
          if (todo) {
            this.setState({
              todo: {
                ...todo,
                id
              }
            });
          }
        })
        .catch(e => console.log(e));
    }
  }

  render() {
    const { todo } = this.state;
    let todoItem = <Spinner />;
    const flexStyles = {
      container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    };
    if (todo) {
      todoItem = (
        <Consumer>
          {value => {
            const { dispatch, todos } = value;
            console.log(todos);
            // return (
            //   <div className="container text-left" style={flexStyles.container}>
            //     <div>
            //       <h1 className="display-5">{todo.taskName}</h1>
            //       <p className="font-italic">Created at: {todo.createdAt}</p>
            //       <p className="lead">{todo.desc}</p>
            //     </div>
            //     <div>
            //       <button className="btn btn-secondary">Delete</button>
            //       <button
            //         onClick={() =>
            //           dispatch({
            //             type: "SHOW_MODAL",
            //             modalType: "EDIT_TODO",
            //             payload: todo
            //           })
            //         }
            //         className="btn ml-1 btn-secondary"
            //       >
            //         Edit
            //       </button>
            //     </div>
            //   </div>
            // );
          }}
        </Consumer>
      );
    }
    return <div className="jumbotron jumbotron-fluid">{todoItem}</div>;
  }
}

export default TodoDetails;
