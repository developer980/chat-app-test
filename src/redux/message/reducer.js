import messages from "../../components/messages";

const initialState = {
  message_list: [],
  id: 0,
};

export function msg_reducer(state = initialState, action) {
  switch (action.type) {
    case "message":
      console.log("new message");
      const mes = { ...action.payload };
      console.log(action.payload);
      return {
        ...state,
        message_list: action.payload.reverse(),
      };
    default:
      return {
        ...state,
      };
  }
}
