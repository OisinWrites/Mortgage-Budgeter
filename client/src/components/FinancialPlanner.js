import React, { useState, useEffect } from 'react';

const FinancialPlanner = ({ netIncome, netIncome2, totalAnnualFees }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [monthlyIncome2, setMonthlyIncome2] = useState(null);
  const [monthlyExpenditure, setMonthlyExpenditure] = useState(null);
  const [savingsRate, setSavingsRate] = useState(100); // As a percentage
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
    value = Math.max(1, Math.min(100, value));
    setSavingsRate(value);
  };
  
  const monthsToGoal = calculateMonthsToReachGoal(monthlySavings, savingsGoal);

  const adjustSavingsRateForInsight = (adjustment) => {
    const newRate = Math.min(100, Math.max(0, savingsRate + adjustment)); // Ensure between 0 and 100%
    const newMonthlySavings = (surplus * newRate) / 100;
    return calculateMonthsToReachGoal(newMonthlySavings, savingsGoal);
  };

  useEffect(() => {
    setMonthlyIncome(netIncome);
    if (netIncome2 !== '0') {
      setMonthlyIncome2(netIncome2);
    }
  }, [netIncome, netIncome2]);

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

      {netIncome2 !== '0' && (
        <div>
          <h3>Second Applicant</h3>
          <div className="split-middle">
            {/* Duplicate the questionnaire for the second applicant */}
            <div>
              <label>Monthly Income (€):</label>
              <input type="number" value={monthlyIncome2} onChange={(e) => setMonthlyIncome2(Number(e.target.value))} />
            </div>
            {/* Add other inputs as needed */}
          </div>
        </div>
      )}


      <div class="p-3">
        <p>Increase savings rate by 5% to reach the goal in {adjustSavingsRateForInsight(5)} months.</p>
        <p>Increase savings rate by 10% to reach the goal in {adjustSavingsRateForInsight(10)} months.</p>
        <h6 class="strong">Months to Reach Goal: {monthsToGoal === Infinity ? "" : monthsToGoal}</h6>
        <div>
      </div>
      </div>
    </div>
  );
};

export default FinancialPlanner;
