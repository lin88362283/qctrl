
import { combineReducers } from "redux";
import countryReducer from "./country";

const rootReducer = combineReducers({
	country: countryReducer
});

export default rootReducer