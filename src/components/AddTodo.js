import React, { Component } from "react";

class AddTodo extends Component {
  state = {
    taskName: "",
    desc: ""
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { addTodo } = this.props;
    return (
      <div className="p-5 text-center w-100">
        <h3 className="mb-3">New Todo</h3>
        <form onSubmit={e => addTodo(e, this.state)}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Task name
              </span>
            </div>
            <input
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
              name="desc"
              onChange={e => this.onInputChange(e)}
              className="form-control"
              aria-label="With textarea"
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
