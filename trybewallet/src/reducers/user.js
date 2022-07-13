// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_EMAIL } from '../actions';

const INITIAL_STATE = { email: '' };

function user(state = INITIAL_STATE, action) {
  const { type, email } = action;
  switch (type) {
  case SET_EMAIL:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
}

export default user;
