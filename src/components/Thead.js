import React from "react";

const Thead = ({
  dispatch,
  todos,
  deleteTodoIds,
  deleteTodoHandler,
  listShow
}) => (
  <thead>
    <tr className="table-active">
      <th scope="col">ID</th>
      <th scope="col">Task name</th>
      <th scope="col">Created at</th>
      <th scope="col">
        <button
          onClick={e => deleteTodoHandler(e, todos, dispatch)}
          disabled={deleteTodoIds.length < 1}
          className="btn btn-sm btn-outline-dark"
        >
          <i className="fas fa-trash" />
        </button>
      </th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
);

export default Thead;
