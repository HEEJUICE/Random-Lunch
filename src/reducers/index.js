import { combineReducers } from "redux";

import peopleReducer from "./peopleReducer";

const rootReducer = combineReducers({
  people: peopleReducer
});

export default rootReducer;
