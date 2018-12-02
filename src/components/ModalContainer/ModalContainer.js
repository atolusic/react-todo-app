import React from "react";
import { Consumer } from "../../context/context";

import AddTodo from "../AddTodo";
import DeletePopup from "../DeletePopup";

const MODAL_COMPONENTS = {
  ADD_TODO: AddTodo,
  EDIT_TODO: AddTodo,
  DELETE_TODO_POPUP: DeletePopup
};

const ModalContainer = () => {
  return (
    <Consumer>
      {value => {
        const SpecificModal = MODAL_COMPONENTS[value.modalType];
        if (!value.modalType) {
          return null;
        }
        return <SpecificModal />;
      }}
    </Consumer>
  );
};

export default ModalContainer;
