import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";
import { updateName } from "../customers/customerSlice";

function AccountOperations() {
   const [depositAmount, setDepositAmount] = useState("");
   const [withdrawalAmount, setWithdrawalAmount] = useState("");
   const [loanAmount, setLoanAmount] = useState("");
   const [loanPurpose, setLoanPurpose] = useState("");
   const [currency, setCurrency] = useState("USD");
   const [updateNameValue, setUpdateNameValue] = useState("");

   const account = useSelector((store) => store.account);
   const dispatch = useDispatch();

   function handleDeposit() {
      if (!depositAmount) return;

      dispatch(deposit(depositAmount, currency));
      setDepositAmount("");
      setCurrency("USD");
   }

   function handleWithdrawal() {
      if (!withdrawalAmount) return;

      dispatch(withdraw(withdrawalAmount));
      setWithdrawalAmount("");
   }

   function handleRequestLoan() {
      if (!loanAmount || !loanPurpose) return;

      dispatch(requestLoan(loanAmount, loanPurpose));
      setLoanAmount("");
      setLoanPurpose("");
   }

   function handlePayLoan() {
      if (account.balance - account.loan < 0) {
         console.log("Nuh uh");
         return;
      }
      dispatch(payLoan());
   }

   function handleUpdateName() {
      if (!updateNameValue) return;
      dispatch(updateName(updateNameValue));
   }

   return (
      <div>
         <h2>Your account operations</h2>
         <div className="inputs">
            <div>
               <label>Deposit</label>
               <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(+e.target.value)}
               />
               <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
               >
                  <option value="USD">US Dollar</option>
                  <option value="EUR">Euro</option>
                  <option value="GBP">British Pound</option>
               </select>

               <button onClick={handleDeposit} disabled={account.isLoading}>
                  {account.isLoading
                     ? "converting..."
                     : `Deposit ${depositAmount}`}
               </button>
            </div>

            <div>
               <label>Withdraw</label>
               <input
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(+e.target.value)}
               />
               <button onClick={handleWithdrawal}>
                  Withdraw {withdrawalAmount}
               </button>
            </div>

            <div>
               <label>Request loan</label>
               <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(+e.target.value)}
                  placeholder="Loan amount"
               />
               <input
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  placeholder="Loan purpose"
               />
               <button onClick={handleRequestLoan}>Request loan</button>
            </div>

            <div>
               <span>Pay back ${account.loan} </span>
               <button onClick={handlePayLoan}>Pay loan</button>
               <input
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  placeholder="Loan purpose"
               />
            </div>
            <div>
               <input
                  value={updateNameValue}
                  onChange={(e) => setUpdateNameValue(e.target.value)}
                  placeholder="Update Name"
               />
               <button onClick={handleUpdateName}>Update Name</button>
            </div>
         </div>
      </div>
   );
}

export default AccountOperations;
