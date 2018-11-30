import React from "react";
import { Consumer } from "../../context/context";

import AddTodo from "../AddTodo";

const MODAL_COMPONENTS = {
  ADD_TODO: AddTodo,
  EDIT_TODO: AddTodo
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
