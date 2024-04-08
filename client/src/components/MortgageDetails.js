import React, { useState } from 'react';

const MortgageDetails = ({ isFirstTimeBuyer }) => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateMonthlyMortgagePayment = (principal, annualInterestRate, loanTermYears) => {
    if (annualInterestRate === 0 || loanTermYears === 0) return 0;
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const loanTermMonths = loanTermYears * 12;
    return principal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const minPropertyValue = isFirstTimeBuyer
      ? Number(mortgageAmount) * (10 / 9)
      : Number(mortgageAmount) * (5 / 4);

    if (Number(purchasePrice) < minPropertyValue) {
      alert(`The purchase price must be at least €${minPropertyValue.toFixed(2)} for a ${isFirstTimeBuyer ? "first-time" : "second-time"} buyer.`);
      return;
    }

    const calculatedMonthlyPayment = calculateMonthlyMortgagePayment(
      Number(mortgageAmount),
      Number(interestRate),
      Number(loanTerm)
    );
    setMonthlyPayment(calculatedMonthlyPayment);
  };

  return (
    <div>
      <h2>Mortgage Details</h2>
      <form onSubmit={handleSubmit}>
        <div class="split-middle">
          <div>
            <label>Estimated Value of Property:</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
          </div>
          <div>
            <label>Mortgage Amount:</label>
            <input
              type="number"
              value={mortgageAmount}
              onChange={(e) => setMortgageAmount(e.target.value)}
            />
          </div>
          <div>
            <label>Loan Term (Years):</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
          </div>
          <div>
            <label>Interest Rate (%):</label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
        </div>
        <button class="m-2" type="submit">Calculate</button>
      </form>
      <h6 class="p-3">Monthly Payment: €{monthlyPayment.toFixed(2)}</h6>
    </div>
  );
};

export default MortgageDetails;
