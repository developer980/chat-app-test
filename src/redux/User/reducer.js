const initialState = {
  username: "",
  email: "",
};

export function user_profile(state = initialState, action) {
  switch (action.type) {
    case "createUser":
      console.log(action.payload);
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
      };
    default:
      return {
        ...state,
      };
  }
}
