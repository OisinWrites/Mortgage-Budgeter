import React, { useState, useEffect } from 'react';

const MortgageDetails = ({ isFirstTimeBuyer, housePrice, mortgageDesired, onLoanTermChange }) => {
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [repaymentSchedule, setRepaymentSchedule] = useState([]);

  useEffect(() => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const loanTermMonths = loanTerm * 12;
    const monthlyPayment = mortgageDesired * 
      (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths)));
  
    let schedule = [];
    let remainingBalance = mortgageDesired;
  
    for (let year = 1; year <= loanTerm; year++) {
      let annualInterestCharged = 0;
      let capitalRepayment = 0;
  
      for (let month = 1; month <= 12; month++) {
        let interestForMonth = remainingBalance * monthlyInterestRate;
        let principalRepaymentForMonth = monthlyPayment - interestForMonth;
        remainingBalance -= principalRepaymentForMonth;
  
        // Accumulate totals for the year
        annualInterestCharged += interestForMonth;
        capitalRepayment += principalRepaymentForMonth;
      }
  
      // Correct for potential negative remaining balance in the last year
      if (remainingBalance < 0) {
        capitalRepayment += remainingBalance; // Subtract since remainingBalance is negative
        remainingBalance = 0;
      }
  
      schedule.push({
        year,
        openingBalance: remainingBalance + capitalRepayment, // Adjusted for the loop's decrement
        annualInterestCharged,
        capitalRepayment,
      });
    }
  
    setMonthlyPayment(monthlyPayment);
    setRepaymentSchedule(schedule);

    // Call the callback function to pass the loan term value to the parent component
    onLoanTermChange(loanTerm);
  }, [mortgageDesired, loanTerm, interestRate, onLoanTermChange]);

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
