import React, { useState, useEffect } from 'react';
import { calculateMonthlyMortgagePayment, generateRepaymentSchedule } from './utilities/mortgageInterestCalc.js';

const MortgageDetails = ({ isFirstTimeBuyer, housePrice, mortgageDesired, onLoanTermChange, updateMonthlyPayment }) => {
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [repaymentSchedule, setRepaymentSchedule] = useState([]);

  useEffect(() => {
    if (mortgageDesired && loanTerm && interestRate) {
      const payment = calculateMonthlyMortgagePayment(mortgageDesired, interestRate, loanTerm);
      const schedule = generateRepaymentSchedule(mortgageDesired, interestRate, loanTerm);
      setMonthlyPayment(payment);
      setRepaymentSchedule(schedule);
      updateMonthlyPayment(payment);
    }
  }, [mortgageDesired, loanTerm, interestRate, updateMonthlyPayment]);

  return (
    <div>
      <h2>Mortgage Details</h2>
      <div class="split-middle">
        <div>
          <p>Value of Property: {housePrice}</p>
        </div>
        <div>
          <p>Mortgage Amount: {mortgageDesired}</p>
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
      <h6 class="p-3">Monthly Payment: €{monthlyPayment.toFixed(2)}</h6>
      <h3>Repayment Schedule</h3>
      <table>
        <thead>
          <tr>
            <th>Year       #</th>
            <th>Opening Balance (€)</th>
            <th>Annual Interest Charged (€)</th>
            <th>Capital Repayment (€)</th>
          </tr>
        </thead>
        <tbody>
          {repaymentSchedule.map(({ year, openingBalance, annualInterestCharged, capitalRepayment }) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{openingBalance.toFixed(2)}</td>
              <td>{annualInterestCharged.toFixed(2)}</td>
              <td>{capitalRepayment.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MortgageDetails;
