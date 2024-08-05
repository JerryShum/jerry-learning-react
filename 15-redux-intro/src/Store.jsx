import { createStore } from "redux";

const initialState = {
   balance: 0,
   loan: 0,
   loanPurpose: "",
};

function reducer(state = initialState, action) {
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

const store = createStore(reducer);

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

store.dispatch(deposit(100));
console.log(store.getState());
store.dispatch(withdraw(50));
console.log(store.getState());
store.dispatch(requestLoan(1000, "Buy a car"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());
