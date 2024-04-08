import React, { useState } from 'react';

const FinancialPlanner = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenditure, setMonthlyExpenditure] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0); // As a percentage
  const [savingsGoal, setSavingsGoal] = useState(0);

  const surplus = monthlyIncome - monthlyExpenditure;
  const monthlySavings = (surplus * savingsRate) / 100;

  const calculateMonthsToReachGoal = (monthlySavings, goalAmount) => {
    if (monthlySavings <= 0) return Infinity; // If monthly savings is 0 or negative, the goal is unattainable.
    const months = goalAmount / monthlySavings;
    return Math.ceil(months); // Round up to the nearest whole month
  };
  
  const monthsToGoal = calculateMonthsToReachGoal(monthlySavings, savingsGoal);

  const adjustSavingsRateForInsight = (adjustment) => {
    const newRate = Math.min(100, Math.max(0, savingsRate + adjustment)); // Ensure between 0 and 100%
    const newMonthlySavings = (surplus * newRate) / 100;
    return calculateMonthsToReachGoal(newMonthlySavings, savingsGoal);
  };

  return (
    <div>
      <h2>Financial Planner</h2>
      <div>
        <div>
          <div>
            <label>Monthly Income (€):</label>
            <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} />
          </div>
          <div>
            <label>Monthly Expenditure (€):</label>
            <input type="number" value={monthlyExpenditure} onChange={(e) => setMonthlyExpenditure(Number(e.target.value))} />
          </div>
          <div>
            <label>Savings Rate (%):</label>
            <input type="number" value={savingsRate} onChange={(e) => setSavingsRate(Number(e.target.value))} />
          </div>
          <div>
            <label>Savings Goal (€):</label>
            <input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(Number(e.target.value))} />
          </div>
          <div>
            <p>Months to Reach Goal: {monthsToGoal === Infinity ? "Goal not reachable with current savings rate." : monthsToGoal}</p>
          </div>
        </div>
      </div>

      <div>
        <label>Savings Goal (€):</label>
        <input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(e.target.value)} />
      </div>
      <div>
        <p>Months to Reach Goal: {monthsToGoal === Infinity ? "Goal not reachable with current savings rate." : monthsToGoal}</p>
      </div>
      <div>
        <p>Increase savings rate by 5% to reach the goal in {adjustSavingsRateForInsight(5)} months.</p>
        <p>Increase savings rate by 10% to reach the goal in {adjustSavingsRateForInsight(10)} months.</p>
      </div>
    </div>
  );
};

export default FinancialPlanner;
