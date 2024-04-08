import React, { useState } from 'react';

const MortgageDetails = () => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [oldestApplicantAge, setOldestApplicantAge] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0); // State to store the calculated monthly payment

  // Determine the maximum loan term based on the age of the oldest applicant
  const maxLoanTerm = 70 - oldestApplicantAge;

  const calculateMonthlyMortgagePayment = (principal, annualInterestRate, loanTermYears) => {
    if (annualInterestRate === 0 || loanTermYears === 0) return 0; // Avoid division by zero
    const monthlyInterestRate = annualInterestRate / 12 / 100; // Convert to a decimal and monthly rate
    const loanTermMonths = loanTermYears * 12;
    const monthlyPayment =
      principal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
    return monthlyPayment;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
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
        <div>
          <label>Estimated Purchase Price of the Property:</label>
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
          <label>Oldest Applicant Age:</label>
          <input
            type="number"
            value={oldestApplicantAge}
            onChange={(e) => setOldestApplicantAge(e.target.value)}
          />
        </div>
        <div>
          <label>Loan Term (Years):</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            max={maxLoanTerm}
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
        <button type="submit">Calculate</button>
      </form>
      <p>Monthly Payment: €{monthlyPayment.toFixed(2)}</p>
    </div>
  );
};

export default MortgageDetails;
