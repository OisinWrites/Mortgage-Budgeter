import React, { useState, useEffect } from 'react';

// Corrected the component definition with proper function syntax
const BorrowingCapacityCalculator = ({ isFirstTimeBuyer, setIsFirstTimeBuyer, setMaxBorrow, setNumberOfApplicants }) => {
  const [numberOfApplicants, setInternalNumberOfApplicants] = useState(1);
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

  useEffect(() => {
    // Update the array size when number of applicants changes
    setApplicantIncomes(Array(numberOfApplicants).fill(null));
  }, [numberOfApplicants]);

  const handleIncomeChange = (index, value) => {
    const newIncomes = [...applicantIncomes];
    newIncomes[index] = Number(value) || null; // Corrected to handle empty string and convert to null
    setApplicantIncomes(newIncomes);
  };

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
          <label>First-time buyer?</label>
          <select class="split limit-width" onChange={(e) => setIsFirstTimeBuyer(e.target.value === 'yes')}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Number of Applicants:</label>
          <select class="split limit-width" value={numberOfApplicants} onChange={handleNumberOfApplicantsChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
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
          {[...Array(numberOfApplicants)].map((_, index) => (
            <div class="split-middle">
              <div>
                <div key={index}>
                  <label>Annual Gross Income #{index + 1}:</label>
                  <input
                    type="number"
                    value={applicantIncomes[index] || ''}
                    placeholder="0"
                    onChange={(e) => handleIncomeChange(index, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
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
        <h6><strong>Maximum Borrowable Amount: €{effectiveMaxBorrow.toFixed(2)}</strong></h6>
        <h6><strong>Estimated Property Value: €{propertyValue.toFixed(2)}</strong></h6>
      </div>
    </div>
  );
};

export default BorrowingCapacityCalculator;
