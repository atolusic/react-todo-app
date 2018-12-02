import React from "react";
import Modal from "react-responsive-modal";

import { Consumer } from "../context/context";
import database from "../firebase/firebase";

const DeletePopup = props => (
  <Consumer>
    {value => {
      const { dispatch, modalOpen, deleteTodoDetails, todos } = value;

      const onOkClickHandler = () => {
        const ids = deleteTodoDetails.ids;
        if (ids.length >= 1) {
          const updates = {};
          todos.forEach(todo => {
            if (ids.includes(todo.id)) {
              updates[todo.id] = null;
            }
          });
          database
            .ref(`todos`)
            .update(updates)
            .then(() => {
              dispatch({ type: "DELETE_TODO", payload: ids });
              if (deleteTodoDetails.redirect) {
                deleteTodoDetails.redirect.fn();
              }
            });
        }
      };

      return (
        <Modal
          open={modalOpen}
          onClose={() => dispatch({ type: "HIDE_MODAL" })}
          center
        >
          <div className="p-5 text-center w-100">
            <h3 className="display-5 mb-4">
              Are you sure you want to delete this record?
            </h3>
            <button
              onClick={() => onOkClickHandler()}
              className="btn btn-sm btn-outline-dark mr-3 p-2 pl-3 pr-3"
            >
              <i className="fas fa-check" />
            </button>
            <button
              onClick={() => dispatch({ type: "HIDE_MODAL" })}
              className="btn btn-sm btn-outline-dark p-2 pl-3 pr-3"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </Modal>
      );
    }}
  </Consumer>
);

export default DeletePopup;
