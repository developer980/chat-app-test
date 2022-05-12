const firstState = {
  selected_user: "",
};

export function selection_reducer(state = firstState, action) {
  switch (action.type) {
    case "selectUser":
      console.log(action.payload);
      return {
        ...state,
        selected_user: action.payload,
      };

    default:
      return state;
  }
}
