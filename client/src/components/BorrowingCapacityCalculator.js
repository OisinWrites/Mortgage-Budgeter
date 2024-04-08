import React, { useState, useEffect } from 'react';

// Corrected the component definition with proper function syntax
const BorrowingCapacityCalculator = ({ isFirstTimeBuyer, setIsFirstTimeBuyer, setMaxBorrow }) => {
  const [numberOfApplicants, setNumberOfApplicants] = useState(1);
  const [applicantIncomes, setApplicantIncomes] = useState(Array(numberOfApplicants).fill(null));
  const [multiplier, setMultiplier] = useState(3.5);
  const [manualMaxBorrow, setManualMaxBorrow] = useState('');
  const [propertyValue, setPropertyValue] = useState(0);
  const [effectiveMaxBorrow, setEffectiveMaxBorrow] = useState(0);
  const [useManualInput, setUseManualInput] = useState(false);

  useEffect(() => {
    let calculatedEffectiveMaxBorrow = 0;

    if (manualMaxBorrow) {
      calculatedEffectiveMaxBorrow = Number(manualMaxBorrow);
    } else {
      const totalIncome = applicantIncomes.reduce((acc, curr) => acc + (curr || 0), 0);
      calculatedEffectiveMaxBorrow = totalIncome * multiplier;
    }

    setEffectiveMaxBorrow(calculatedEffectiveMaxBorrow);

    const loanToValueRatio = isFirstTimeBuyer ? 0.9 : 0.8;
    setPropertyValue(calculatedEffectiveMaxBorrow / loanToValueRatio);
    setMaxBorrow(calculatedEffectiveMaxBorrow);

  }, [applicantIncomes, multiplier, manualMaxBorrow, isFirstTimeBuyer, setMaxBorrow]);

  const handleIncomeChange = (index, value) => {
    const newIncomes = [...applicantIncomes];
    newIncomes[index] = Number(value) || null; // Corrected to handle empty string and convert to null
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
      {useManualInput ? (
        <div>
          <button onClick={() => {
            setManualMaxBorrow('');
            setUseManualInput(false);
          }}>Use Simple Mortgage Calculator</button>
          <br></br>
          <label>Manual input for borrowing capacity:</label>
          <input
            type="number"
            placeholder="Mortgage Quote"
            value={manualMaxBorrow}
            onChange={handleManualMaxBorrowChange}
          />
        </div>
      ) : (
        <div>
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
          <label className="pr-1">Toggle Exemption: 
            <button onClick={toggleExemption}>{multiplier === 3.5 ? "3.5x" : "4.5x"}</button>
          </label>
          <div>
            <p>All banks have their own policies based on an applicant's unique position.<br></br>
              For a more accurate calculation of your borrowing ability,<br></br> please refer to your preferred lender.</p>
            <button onClick={() => setUseManualInput(true)}>Use a Mortgage Quote</button>
          </div>
        </div>
      )}
      <div>
        <p>Maximum Borrowable Amount: €{effectiveMaxBorrow}</p>
        <p><strong>Estimated Property Value: €{propertyValue}</strong></p>
      </div>
    </div>
  );
};

export default BorrowingCapacityCalculator;
