
export const reducers = (state, action) => {
  console.log(action.carts)
  switch (action.type) {
    case "CARTS":
      return {
        ...state,
        carts: action.carts,
      };
    case "PERSIST":
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

const combineReducers = (state, action) => {
  return reducers(state, action);
};

const persitingData = (state, action) => {
  // to whitelist where data should be persisted
  const persistData = { pokemonCarts: state.pokemonCarts, token: state.token };
  // if u need persist all data just uncomment this line
  // const persistData = { ...state };
  localStorage.setItem("persistData", JSON.stringify(persistData));
};

export const initialReducerState = {
  carts: [],
  token: null,
};

const reducer = (state, action) => {
  const states = combineReducers(state, action);
  persitingData(states, action);
  return states;
};

export default reducer;
