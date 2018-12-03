import React from "react";

const Thead = ({ dispatch, deleteTodoIds, handleSort }) => (
  <thead>
    <tr className="table-active">
      <th scope="col">ID</th>
      <th scope="col">
        Task name
        <i
          className="fas fa-sort-down"
          onClick={() => handleSort("taskName")}
        />
      </th>
      <th scope="col">
        Created at{" "}
        <i className="fas fa-sort-down" onClick={() => handleSort("date")} />
      </th>
      <th scope="col">
        <button
          onClick={e => {
            dispatch({
              type: "SHOW_MODAL",
              modalType: "DELETE_TODO_POPUP",
              deleteTodoDetails: {
                ids: deleteTodoIds
              }
            });
          }}
          disabled={deleteTodoIds.length === 0}
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
