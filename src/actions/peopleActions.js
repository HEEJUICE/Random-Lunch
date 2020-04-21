import axios from "axios";
export const FETCH_PEOPLE_PENDING = "FETCH_PEOPLE_PENDING";
export const FETCH_PEOPLE_SUCCESS = "FETCH_PEOPLE_SUCCESS";
export const FETCH_PEOPLE_FAILURE = "FETCH_PEOPLE_FAILURE";

// Create Redux action creators that return an action
export const fetchPeoplePending = () => ({
  type: FETCH_PEOPLE_PENDING
});

export const fetchPeopleSuccess = (people) => ({
  type: FETCH_PEOPLE_SUCCESS,
  payload: people
});

export const fetchPeopleFailure = () => ({
  type: FETCH_PEOPLE_FAILURE
});

// Combine them all in an asynchronous thunk
export const fetchPeople = () => {
  return async (dispatch) => {
    dispatch(fetchPeoplePending());

    try {
      await axios.get("http://localhost:2018/api/people").then((json) => {
        // return console.log(json)
        const data = json.data;
        return dispatch(fetchPeopleSuccess(data));
      });
    } catch (error) {
      dispatch(fetchPeopleFailure(error));
    }
  };
};

// export const initialState = {
//   people: [],
//   pending: false,
//   error: false
// }

// const peopleReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_PEOPLE_PENDING:
//       return { ...state, pending: true }
//     case FETCH_PEOPLE_SUCCESS:
//       return { people: action.payload, pending: false, error: false }
//     case FETCH_PEOPLE_FAILURE:
//       return { ...state, pending: false, error: true }
//     default:
//       return state
//   }
// }

// export default peopleReducer
