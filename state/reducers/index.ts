
import { combineReducers } from "redux";
import countryReducer from "./country";

/**
 * @description combined all data items reducers as a root reducer
 */
const rootReducer = combineReducers({
	country: countryReducer
});

export default rootReducer