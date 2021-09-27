import { RECEIVE_USERS } from "../actions/users";
import { ADD_POLL, RECEIVE_POLLS } from "../actions/polls";
import { ADD_ANSWER } from "../actions/answers";
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_POLL:
      const poll = action.poll;
      const { author, id } = poll;
      return {
        ...state,
        [author]: {
          ...state[author],
          polls: state[author].polls.concat([id]),
        },
      };
    case ADD_ANSWER:
      const user = state[action.authedUser];
      return {
        ...state,
        answers: user.answers.concat([action.id]),
      };
    default:
      return state;
  }
}