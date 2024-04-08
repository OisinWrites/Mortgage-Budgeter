import React, { useState } from 'react';

const FinancialPlanner = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenditure, setMonthlyExpenditure] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0); // As a percentage
  const [savingsGoal, setSavingsGoal] = useState(0);

  const surplus = monthlyIncome - monthlyExpenditure;
  const monthlySavings = (surplus * savingsRate) / 100;

  const monthsToGoal = calculateMonthsToReachGoal(monthlySavings, savingsGoal);

  const adjustSavingsRateForInsight = (adjustment) => {
    const newRate = Math.min(100, Math.max(0, savingsRate + adjustment)); // Ensure between 0 and 100%
    const newMonthlySavings = (surplus * newRate) / 100;
    return calculateMonthsToReachGoal(newMonthlySavings, savingsGoal);
  };

  return (
    <div>
      <h2>Financial Planner</h2>
      {/* Existing inputs for income, expenditure, and savings rate */}
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
