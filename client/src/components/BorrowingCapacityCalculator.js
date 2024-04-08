import React, { useState, useEffect } from 'react';

const BorrowingCapacityCalculator = ({ isFirstTimeBuyer, setIsFirstTimeBuyer, setMaxBorrow }) => {
  const [numberOfApplicants, setNumberOfApplicants] = useState(1);
  const [applicantIncomes, setApplicantIncomes] = useState([null, null]);
  const [multiplier, setMultiplier] = useState(3.5);
  const [manualMaxBorrow, setManualMaxBorrow] = useState('');

  useEffect(() => {
    if (!manualMaxBorrow) { 
      const totalIncome = applicantIncomes.reduce((acc, curr) => acc + (curr || 0), 0);
      const maxBorrow = totalIncome * multiplier;
      setMaxBorrow(maxBorrow);
    }
  }, [applicantIncomes, multiplier, manualMaxBorrow, setMaxBorrow]);

  const handleIncomeChange = (index, value) => {
    const newIncomes = [...applicantIncomes];
    newIncomes[index] = Number(value);
    setApplicantIncomes(newIncomes);
  };

  const toggleExemption = () => {
    setMultiplier(multiplier === 3.5 ? 4.5 : 3.5);
  };

  const handleManualMaxBorrowChange = (e) => {
    const value = e.target.value;
    setManualMaxBorrow(value);
    setMaxBorrow(value ? Number(value) : 0);
  };

  const calculateBorrowingCapacity = () => {
    const totalIncome = applicantIncomes.reduce((acc, curr) => acc + curr, 0);
    const maxBorrow = totalIncome * multiplier;
    const propertyValue = isFirstTimeBuyer ? (maxBorrow / 0.9) : (maxBorrow / 0.8);
    return { maxBorrow, propertyValue };
  };

  const { maxBorrow, propertyValue } = calculateBorrowingCapacity();

  return (
    <div>
      <h2>Borrowing Capacity Calculator</h2>
      <div>
        <label>First-time buyer?</label>
        <select onChange={(e) => setIsFirstTimeBuyer(e.target.value === 'yes')}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div>
        <label>Number of Applicants:</label>
        <select onChange={(e) => setNumberOfApplicants(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>
      {[...Array(numberOfApplicants)].map((_, index) => (
        <div key={index}>
          <label>Applicant {index + 1} Annual Gross Income:</label>
          <input
            type="number"
            value={applicantIncomes[index] || ''}
            placeholder="0"
            onChange={(e) => handleIncomeChange(index, e.target.value)}
          />
        </div>
      ))}
      <label class="pr-1">Toggle Exemption: 
        <button onClick={toggleExemption}>{multiplier === 3.5 ? "3.5x" : "4.5x"}</button>
      </label>
      <div>
        <p>Maximum Borrowable Amount: €{maxBorrow.toFixed(2)}</p>
        <p>All banks have their own policies based on an applicant's unique position.<br></br>
        For a more accurate calculation of your borrowing ability,<br></br> please refer to your preferred lender.</p>

        <div>
          <label>You can manually input your borrowing capacity figure here:</label>
          <input
            type="number"
            placeholder="Borrowable Amount"
            value={manualMaxBorrow}
            onChange={handleManualMaxBorrowChange}
          />
        </div>


        <p><strong>Estimated Property Value: €{propertyValue.toFixed(2)}</strong></p>
      </div>
    </div>
  );
};

export default BorrowingCapacityCalculator;
