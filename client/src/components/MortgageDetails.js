import React, { useState } from 'react';

const MortgageDetails = ({ isFirstTimeBuyer, updateFirstTimeBuyer }) => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [oldestApplicantAge, setOldestApplicantAge] = useState('');

  // Determine the maximum loan term based on the age of the oldest applicant
  const maxLoanTerm = 70 - oldestApplicantAge;

  const calculateMonthlyMortgagePayment = (principal, annualInterestRate, loanTermYears) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100; // Convert to a decimal and monthly rate
    const loanTermMonths = loanTermYears * 12;
  
    // Monthly mortgage payment formula
    const monthlyPayment =
      principal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
  
    return monthlyPayment;
  };

  return (
    <div>
      <h2>Mortgage Details</h2>
      {!isFirstTimeBuyer && (
        <div>
          <label>First-time buyer?</label>
          <select onChange={(e) => updateFirstTimeBuyer(e.target.value === 'yes')}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      )}
      <div>
        <label>Estimated Purchase Price of the Property:</label>
        <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
      </div>
      <div>
        <label>Mortgage Amount:</label>
        <input type="number" value={mortgageAmount} onChange={(e) => setMortgageAmount(e.target.value)} />
      </div>
      <div>
        <label>Oldest Applicant Age:</label>
        <input type="number" value={oldestApplicantAge} onChange={(e) => setOldestApplicantAge(e.target.value)} />
      </div>
      <div>
        <label>Loan Term (Years):</label>
        <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} max={maxLoanTerm} />
      </div>
      <div>
        <label>Interest Rate (%):</label>
        <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="Loan Amount" />
        <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} placeholder="Annual Interest Rate" />
        <input type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} placeholder="Loan Term (Years)" />
        <button type="submit">Calculate</button>
        <p>Monthly Payment: {monthlyPayment.toFixed(2)}</p>
      </form>
      </div>
    </div>
  );
};

export default MortgageDetails;
