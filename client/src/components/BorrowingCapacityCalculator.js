import React, { useState, useEffect } from 'react';

// Corrected the component definition with proper function syntax
const BorrowingCapacityCalculator = ({ 
  isFirstTimeBuyer, 
  setIsFirstTimeBuyer, 
  setMaxBorrow, 
  setNumberOfApplicants,
  applicantIncomes,
  onIncomeChange,
  effectiveMaxBorrow,
  setEffectiveMaxBorrow,
  propertyValue
  }) => {
  const [numberOfApplicants, setInternalNumberOfApplicants] = useState(1);
  const [multiplier, setMultiplier] = useState(3.5);
  const [manualMaxBorrow, setManualMaxBorrow] = useState('');
  const [useManualInput, setUseManualInput] = useState(false);

  useEffect(() => {
    let calculatedEffectiveMaxBorrow = 0;

    if (manualMaxBorrow) {
      // If there is a manual input for max borrow, use that value
      calculatedEffectiveMaxBorrow = Number(manualMaxBorrow);
    } else {
      // Otherwise, calculate based on applicant incomes and multiplier
      const totalIncome = applicantIncomes.reduce((acc, curr) => acc + (curr || 0), 0);
      calculatedEffectiveMaxBorrow = totalIncome * multiplier;
    }

    setEffectiveMaxBorrow(calculatedEffectiveMaxBorrow);

  }, [applicantIncomes, multiplier, manualMaxBorrow, setEffectiveMaxBorrow]);

  const toggleExemption = () => {
    setMultiplier(multiplier === 3.5 ? 4.5 : 3.5);
  };

  const handleNumberOfApplicantsChange = (e) => {
    const newCount = Number(e.target.value);
    setInternalNumberOfApplicants(newCount);
    setNumberOfApplicants(newCount); // Update state in App.js via prop
  };

  const handleManualMaxBorrowChange = (e) => {
    const value = e.target.value;
    setManualMaxBorrow(value);
    setMaxBorrow(value ? Number(value) : 0);
  };

  return (
    <div>
      <h2>Borrowing Capacity Calculator</h2>
      <div class="split-middle">
        <div>
          <label>First-time buyer:</label>
          <select class="split limit-width" onChange={(e) => setIsFirstTimeBuyer(e.target.value === 'yes')}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Applicants:</label>
          <select class="split limit-width" value={numberOfApplicants} onChange={handleNumberOfApplicantsChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
        
          {[...Array(numberOfApplicants)].map((_, index) => (
              <div class="split-middle">
                <div>
                  <div key={index}>
                    <label>Gross Salary #{index + 1}:</label>
                    <input
                      class="split"
                      type="number"
                      value={applicantIncomes[index] || ''}
                      placeholder="0"
                      onChange={(e) => onIncomeChange(index, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
     
      </div>
      {useManualInput ? (
        <div>
          <div class="split-middle">
            <div>
              <label>Mortgage Quote: </label>
              <input
                class="split"
                type="number"
                placeholder="Mortgage Quote"
                value={manualMaxBorrow}
                onChange={handleManualMaxBorrowChange}
              />
            </div>
          </div>

          <button class="m-2" onClick={() => {
            setManualMaxBorrow('');
            setUseManualInput(false);
          }}>Use Simple Mortgage Calculator</button>
        </div>
      ) : (
        <div>
          <label class="mt-1"> 
            <button class="m-1" onClick={toggleExemption}>{multiplier === 3.5 ? "3.5x" : "4.5x"}</button><br></br>
            toggle for exemption rate
          </label>
          <div>
            <p>All banks have their own policies based on an applicant's unique position.<br></br>
              For a more accurate calculation of your borrowing ability,<br></br> please refer to your preferred lender.</p>
            <button onClick={() => setUseManualInput(true)}>Use a Mortgage Quote</button>
          </div>
        </div>
      )}
      <div class="mt-2 p-3">
        <h6><strong>Maximum Borrowable Amount: €{effectiveMaxBorrow ? effectiveMaxBorrow.toFixed(2) : "0"}</strong></h6>
        <h6><strong>Estimated Property Value: €{propertyValue ? propertyValue.toFixed(2) : "0"}</strong></h6>
      </div>
    </div>
  );
};

export default BorrowingCapacityCalculator;
