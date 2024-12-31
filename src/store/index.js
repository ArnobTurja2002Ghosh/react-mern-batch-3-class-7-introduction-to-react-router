import {cartReducer} from "./reducers/cartReducer"
import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension"
const rootReducer=combineReducers({cart: cartReducer})
export const store = createStore(rootReducer, composeWithDevTools());