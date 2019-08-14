import uuid from "uuid/v4";
import {
  UPDATE_FILTER,
  ADD_TODO,
  UPDATE_TODO_STATUS,
  CLEAR_COMPLETED,
} from "../constants";

export const addTodo = item => {
  return {
    type: ADD_TODO,
    payload: {
      id: uuid(),
      item,
      isCompleted: false,
    },
  };
};

export const updateTodoStatus = (id, isCompleted) => {
  console.log(id, isCompleted);
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      id,
      isCompleted,
    },
  };
};
export const updateFilter = filter => ({
  type: UPDATE_FILTER,
  payload: filter,
});

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED,
  };
};
