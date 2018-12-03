import React, { Component } from "react";
import Spinner from "./Spinner";
import { TinyPagination } from "react-pagination-custom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import moment from "moment";

import database from "../firebase/firebase";
import Todos from "./Todos";
import Todo from "./Todo";
import { Consumer, Context } from "../context/context";
import Thead from "./Thead";

class MainPage extends Component {
  static contextType = Context;
  state = {
    deleteTodoIds: [],
    selectedPageId: 1,
    dropdownValue: "Task name",
    searchFieldValue: "",
    sort: {
      sortBy: null,
      direction: null
    }
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

  handleSearch = (todo, dpVal) => {
    const { searchFieldValue } = this.state;

    return todo[dpVal].toLowerCase().includes(searchFieldValue.toLowerCase())
      ? todo
      : null;
  };

  handleSort = (sortBy = "taskName") => {
    const { sort } = this.state;
    const o = {};
    if (sortBy !== "taskName") {
      o.sortBy = "date";
      if (sort.direction === "desc" || sort.direction === null) {
        o.direction = "asc";
      } else {
        o.direction = "desc";
      }
    } else {
      o.sortBy = "taskName";
      if (sort.direction === "desc" || sort.direction === null) {
        o.direction = "asc";
      } else {
        o.direction = "desc";
      }
    }

    this.setState(prevState => {
      return {
        ...prevState,
        sort: o
      };
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
    const {
      deleteTodoIds,
      selectedPageId,
      dropdownValue,
      searchFieldValue,
      sort
    } = this.state;
    const dropdownOptions = ["ID", "Task Name", "Description", "Created at"];
    return (
      <Consumer>
        {value => {
          const { todos, dispatch } = value;
          let listShow = [...todos]
            .filter(todo => {
              if (searchFieldValue.length > 2) {
                switch (dropdownValue) {
                  case "ID":
                    return this.handleSearch(todo, "id");
                  case "Task name":
                    return this.handleSearch(todo, "taskName");
                  case "Description":
                    return this.handleSearch(todo, "desc");
                  case "Created at":
                    return this.handleSearch(todo, "createdAt");

                  default:
                    return todo;
                }
              }
              return todo;
            })
            .sort((a, b) => {
              if (sort.sortBy === "taskName") {
                let textA = a.taskName.toUpperCase();
                let textB = b.taskName.toUpperCase();
                if (sort.direction === "asc") {
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                } else {
                  return textA > textB ? -1 : textA < textB ? 1 : 0;
                }
              } else if (sort.sortBy === "date") {
                let dateA = moment(a.createdAt).valueOf();
                let dateB = moment(b.createdAt).valueOf();
                return sort.direction === "asc" ? dateA - dateB : dateB - dateA;
              } else {
              }
            });
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
                  handleSort={this.handleSort}
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
              <h1 className="mb-3">React TodoApp</h1>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <Dropdown
                    onChange={selected => {
                      this.setState({ dropdownValue: selected.value });
                    }}
                    controlClassName="dp"
                    options={dropdownOptions}
                    value={dropdownValue}
                  />
                </div>
                <input
                  style={{ height: "2.5rem" }}
                  type="text"
                  className="form-control"
                  placeholder={dropdownValue}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={e =>
                    this.setState({ searchFieldValue: e.target.value })
                  }
                />
              </div>
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
