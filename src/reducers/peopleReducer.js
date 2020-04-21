import * as actions from "../actions/peopleActions";

export const initialState = {
  people: [],
  pending: false,
  error: false
};

const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_PEOPLE_PENDING:
      return { ...state, pending: true };
    case actions.FETCH_PEOPLE_SUCCESS:
      return { people: action.payload, pending: false, error: false };
    case actions.FETCH_PEOPLE_FAILURE:
      return { ...state, pending: false, error: true };
    default:
      return state;
  }
};

export default peopleReducer;
