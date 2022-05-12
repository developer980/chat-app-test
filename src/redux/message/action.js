export function add_message(payload) {
  return {
    type: "message",
    payload,
  };
}
