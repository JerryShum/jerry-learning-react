import { act } from "react";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
   account: accountReducer,
   customer: customerReducer,
});

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk))
);

export default store;
