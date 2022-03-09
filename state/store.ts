
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootStore = ReturnType<typeof rootReducer>

export default Store