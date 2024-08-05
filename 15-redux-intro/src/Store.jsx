import { act } from "react";
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
   balance: 0,
   loan: 0,
   loanPurpose: "",
};

const initalStateCustomer = {
   fullName: "",
   nationalID: "",
   createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
   switch (action.type) {
      case "account/deposit":
         return { ...state, balance: state.balance + action.payload };
      case "account/withdraw":
         return { ...state, balance: state.balance - action.payload };

      case "account/requestLoan":
         //Later
         if (state.loan > 0) return state;
         return {
            ...state,
            loan: action.payload.amount,
            loanPurpose: action.payload.purpose,
            balance: state.balance + action.payload.amount,
         };
      case "account/payLoan":
         return {
            ...state,
            loan: 0,
            loanPurpose: "",
            balance: state.balance - state.loan,
         };

      default:
         return state;
   }
}

function deposit(amount) {
   return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
   return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
   return {
      type: "account/requestLoan",
      payload: { amount: amount, purpose: purpose },
   };
}

function payLoan() {
   return { type: "account/payLoan" };
}

function customerReducer(state = initalStateCustomer, action) {
   switch (action.type) {
      case "customer/createCustomer":
         return {
            ...state,
            fullName: action.payload.fullName,
            nationalID: action.payload.nationalID,
            createdAt: action.payload.createdAt,
         };

      case "customer/updateName":
         return {
            ...state,
            fullName: action.payload,
         };

      default:
         return state;
   }
}

function createCustomer(fullName, nationalID) {
   return {
      type: "customer/createCustomer",
      payload: {
         fullName: fullName,
         nationalID: nationalID,
         createdAt: new Date().toISOString,
      },
   };
}

function updateName(fullName) {
   return {
      type: "customer/updateName",
      payload: fullName,
   };
}

const rootReducer = combineReducers({
   account: accountReducer,
   customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch(deposit(100));
store.dispatch(createCustomer("Jerry Shum ", "1234123"));
console.log(store.getState());
store.dispatch(withdraw(50));
console.log(store.getState());
store.dispatch(requestLoan(1000, "Buy a car"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());
