import React, { useState } from 'react';

const BorrowingCapacityCalculator = ({ isFirstTimeBuyer, setIsFirstTimeBuyer }) => {
  const [numberOfApplicants, setNumberOfApplicants] = useState(1);
  const [applicantIncomes, setApplicantIncomes] = useState([null, null]);

  const handleIncomeChange = (index, value) => {
    const newIncomes = [...applicantIncomes];
    newIncomes[index] = Number(value);
    setApplicantIncomes(newIncomes);
  };

  const calculateBorrowingCapacity = () => {
    const totalIncome = applicantIncomes.reduce((acc, curr) => acc + curr, 0);
    const maxBorrow = totalIncome * 3.5;
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
            value={applicantIncomes[index]}
            placeholder="0"
            onChange={(e) => handleIncomeChange(index, e.target.value)}
          />
        </div>
      ))}
      <div>
        <p>Maximum Borrowable Amount: €{maxBorrow.toFixed(2)}</p>
        <p>Estimated Property Value: €{propertyValue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BorrowingCapacityCalculator;
