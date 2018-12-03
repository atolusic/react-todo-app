import React, { Component } from "react";
import Modal from "react-responsive-modal";

import { Consumer } from "../context/context";
import database from "../firebase/firebase";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.taskNameInput = React.createRef();
    this.descriptionInput = React.createRef();
  }

  addTodo = (e, dispatch, isEdit) => {
    e.preventDefault();

    const saveData = {
      taskName: this.taskNameInput.current.value,
      desc: this.descriptionInput.current.value,
      createdAt: new Date().getTime()
    };

    if (isEdit) {
      database
        .ref(`todos/${isEdit.id}`)
        .update(saveData)
        .then(() => {
          saveData.id = isEdit.id;
          dispatch({ type: "EDIT_TODO", payload: saveData });
        })
        .catch(e => console.log(e));
    } else {
      database
        .ref(`todos`)
        .push(saveData)
        .then(ref => {
          dispatch({ type: "ADD_TODO", payload: { id: ref.key, ...saveData } });
        });
    }
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, modalOpen, edit } = value;
          let isEdit = edit ? { ...edit } : null;
          return (
            <Modal
              open={modalOpen}
              onClose={() => dispatch({ type: "HIDE_MODAL" })}
              center
            >
              <div className="p-5 text-center w-100">
                <h3 className="mb-3">{edit ? "Edit Todo" : "New Todo"}</h3>
                <form onSubmit={e => this.addTodo(e, dispatch, isEdit)}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Task name
                      </span>
                    </div>
                    <input
                      defaultValue={edit && edit.taskName}
                      name="taskName"
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      required
                      ref={this.taskNameInput}
                    />
                  </div>
                  <div className="input-group input-group-md mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Description</span>
                    </div>
                    <textarea
                      defaultValue={edit && edit.desc}
                      name="desc"
                      className="form-control"
                      aria-label="With textarea"
                      ref={this.descriptionInput}
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary">
                    {edit ? "Edit" : "Add"}
                  </button>
                </form>
              </div>
            </Modal>
          );
        }}
      </Consumer>
    );
  }
}

export default AddTodo;
