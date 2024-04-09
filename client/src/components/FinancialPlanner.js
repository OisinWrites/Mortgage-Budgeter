import React, { useState } from 'react';
import { calculateNetIncome } from '../utilities/taxCalc';

const FinancialPlanner = ({
  grossIncome1,
  grossIncome2,
  totalAnnualFees,
  hasSecondApplicant,
}) => {
  const [savingsRate, setSavingsRate] = useState(100); // As a percentage
  const [savingsGoal, setSavingsGoal] = useState('');
  const [monthlyExpenditure, setMonthlyExpenditure] = useState('');

  const netIncome1 = calculateNetIncome(grossIncome1);
  
  let netIncome2 = 0;
  if (hasSecondApplicant && grossIncome2) {
    netIncome2 = calculateNetIncome(grossIncome2);
  }

  const calculateMonthlySavings = (annualIncome) => {
    const monthlyIncome = annualIncome / 12;
    const surplus = monthlyIncome - monthlyExpenditure;
    return (surplus * savingsRate) / 100;
  };

  const calculateMonthsToReachGoal = (monthlySavings, goalAmount) => {
    if (!goalAmount || monthlySavings <= 0) return "Goal not achievable with current setup";
    const months = goalAmount / monthlySavings;
    return Math.ceil(months); // Round up to the nearest whole month
  };

  const monthlySavings1 = calculateMonthlySavings(grossIncome1 || 0);
  const monthlySavings2 = hasSecondApplicant ? calculateMonthlySavings(grossIncome2 || 0) : 0;
  const totalMonthlySavings = monthlySavings1 + monthlySavings2;

  const monthsToGoal = calculateMonthsToReachGoal(totalMonthlySavings, savingsGoal);

  return (
    <div>
      <h2>Financial Planner</h2>
      <div className="split-middle">
        <div>
          <label>Gross Annual Income for Applicant #1 (€):</label>
          <input type="number" value={grossIncome1 || ''} readOnly />
          <p>Net Annual Income for Applicant #1: €{netIncome1.toFixed(2)}</p>
          
        </div>
        {hasSecondApplicant && (
          <div>
            <label>Gross Annual Income for Applicant #2 (€):</label>
            <input type="number" value={grossIncome2 || ''} readOnly />
            <p>Net Annual Income for Applicant #2: €{netIncome2.toFixed(2)}</p>
          </div>
        )}
        <div>
          <label>Monthly Expenditure (€):</label>
          <input type="number" value={monthlyExpenditure} onChange={(e) => setMonthlyExpenditure(Number(e.target.value))} />
        </div>
        <div>
          <label>Savings Rate (%):</label>
          <input
            type="number"
            value={savingsRate}
            onChange={(e) => setSavingsRate(Math.min(100, Math.max(1, Number(e.target.value))))}
            min="1"
            max="100"
          />
        </div>
        <div>
          <label>Savings Goal (€):</label>
          <input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(Number(e.target.value))} />
        </div>
      </div>

      <div className="p-3">
        <h6>Months to Reach Goal: {monthsToGoal}</h6>
      </div>
    </div>
  );
};

export default FinancialPlanner;
