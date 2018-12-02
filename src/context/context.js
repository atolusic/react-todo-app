import React, { Component } from "react";

export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        modalType: action.modalType,
        modalOpen: true,
        edit: action.payload
      };
    case "HIDE_MODAL":
      return {
        ...state,
        modalType: null,
        modalOpen: false
      };
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      };
    case "GET_TODO": {
      return {
        ...state,
        todos: [action.payload]
      };
    }
    case "ADD_TODO": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
        modalType: null,
        modalOpen: false
      };
    }
    case "DELETE_TODO": {
      const todos = state.todos.filter(
        todo => action.payload.includes(todo.id) !== true
      );
      return {
        ...state,
        todos
      };
    }
    case "EDIT_TODO": {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? Object.assign(todo, action.payload)
            : todo
        ),
        modalType: null,
        modalOpen: false
      };
    }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    todos: [],
    dispatch: action => this.setState(state => reducer(state, action)),
    modalType: null,
    modalOpen: false
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
