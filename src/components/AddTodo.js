import React, { Component } from "react";
import Modal from "react-responsive-modal";

class AddTodo extends Component {
  state = {
    taskName: "",
    desc: "",
    id: ""
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { addTodo, onClose, open } = this.props;
    const { taskName, desc, id } = this.state;
    return (
      <Modal open={open} onClose={onClose} center>
        <div className="p-5 text-center w-100">
          <h3 className="mb-3">{id ? "Edit Todo" : "New Todo"}</h3>
          <form onSubmit={e => addTodo(e, this.state, onClose)}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Task name
                </span>
              </div>
              <input
                value={taskName}
                name="taskName"
                onChange={e => this.onInputChange(e)}
                type="text"
                className="form-control"
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group input-group-md mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Description</span>
              </div>
              <textarea
                value={desc}
                name="desc"
                onChange={e => this.onInputChange(e)}
                className="form-control"
                aria-label="With textarea"
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              {id ? "Edit" : "Add"}
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}

export default AddTodo;
