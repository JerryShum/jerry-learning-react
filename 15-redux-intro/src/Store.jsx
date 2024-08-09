import { act } from "react";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
   account: accountReducer,
   customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
