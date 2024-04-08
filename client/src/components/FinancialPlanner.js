import React, { useState } from 'react';

const FinancialPlanner = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [monthlyExpenditure, setMonthlyExpenditure] = useState(null);
  const [savingsRate, setSavingsRate] = useState(20); // As a percentage
  const [savingsGoal, setSavingsGoal] = useState(null);

  const surplus = monthlyIncome - monthlyExpenditure;
  const monthlySavings = (surplus * savingsRate) / 100;

  const calculateMonthsToReachGoal = (monthlySavings, goalAmount) => {
    if (monthlySavings <= 0) return "-"; // If monthly savings is 0 or negative, the goal is unattainable.
    const months = goalAmount / monthlySavings;
    return Math.ceil(months); // Round up to the nearest whole month
  };

  const handleSavingsRateChange = (event) => {
    let value = Number(event.target.value);
    value = Math.max(1, Math.min(100, value)); // Enforce the value to be between 1 and 100
    setSavingsRate(value);
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
        <div class="split-middle">
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
            <input
              type="number"
              value={savingsRate}
              onChange={handleSavingsRateChange} // Use the new handler here
              min="1"
              max="100"
              placeholder="Savings Rate (%)"
            />
          </div>
          <div>
            <label>Savings Goal (€):</label>
            <input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(Number(e.target.value))} />
          </div>
        </div>
      </div>


      <div class="p-3">
        <p>Increase savings rate by 5% to reach the goal in {adjustSavingsRateForInsight(5)} months.</p>
        <p>Increase savings rate by 10% to reach the goal in {adjustSavingsRateForInsight(10)} months.</p>
        <h6 class="strong">Months to Reach Goal: {monthsToGoal === Infinity ? "" : monthsToGoal}</h6>
      </div>
    </div>
  );
};

export default FinancialPlanner;
