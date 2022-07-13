// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_CURRENCIES, SET_EXPENSES, SET_NEW_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const { type, currencies, newExpenses, newArrayExpenses } = action;
  switch (type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies,
    };
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, newExpenses],
    };
  case SET_NEW_EXPENSES:
    return {
      ...state,
      expenses: newArrayExpenses,
    };
  default:
    return state;
  }
}

export default wallet;
