import searchAPI from '../services/fetchApi';
// Coloque aqui suas actions
export const SET_EMAIL = 'GET_EMAIL';
export const SET_CURRENCIES = 'GET_WALLET';
export const SET_EXPENSES = 'GET_AWESOMEAPI';
export const SET_NEW_EXPENSES = 'SET_NEW_EXPENSES';

export const setEmail = (email) => ({
  type: SET_EMAIL,
  email,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

export const setExpenses = (newExpenses) => ({
  type: SET_EXPENSES,
  newExpenses,
});

export const setNewExpenses = (newArrayExpenses) => ({
  type: SET_NEW_EXPENSES,
  newArrayExpenses,
});

export const setFetchCurrencies = () => async (dispatch) => {
  try {
    const response = await searchAPI();
    const dataArray = Object.keys(response)
      .filter((item) => item !== 'USDT');
    dispatch(setCurrencies(dataArray));
  } catch (error) {
    console.error(error);
  }
};

export const setFetchExpenses = (expenses) => async (dispatch) => {
  try {
    const response = await searchAPI();
    const newExpenses = {
      ...expenses,
      exchangeRates: response,
    };
    dispatch(setExpenses(newExpenses));
  } catch (error) {
    console.error(error);
  }
};
