import {
  ADD_TODO,
  UPDATE_FILTER,
  UPDATE_TODO_STATUS,
  CLEAR_COMPLETED,
} from "../constants";

export const Visibilityfilters = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "isCompleted",
};

const INITIAL_STATE = {
  todos: [],
  filter: Visibilityfilters.SHOW_ALL,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO_STATUS:
      console.log(state);
      console.log(action.payload);
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? {
                ...todo,
                ...action.payload,
              }
            : todo
        ),
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.isCompleted),
      };

    default:
      return state;
  }
};
