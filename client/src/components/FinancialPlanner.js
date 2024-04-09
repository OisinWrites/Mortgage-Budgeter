import React, { useState, useEffect  } from 'react';
import { calculateTaxDetails } from './utilities/taxCalc.js';

const FinancialPlanner = ({
    totalAnnualFees,
    loanTerm,
    hasSecondApplicant,
    applicantIncomes
  }) => {

  const grossIncome1 = applicantIncomes[0] || 0;
  const grossIncome2 = hasSecondApplicant ? (applicantIncomes[1] || 0) : 0;

  const [annualHomeownerFees, setAnnualHomeownerFees] = useState(totalAnnualFees);

  const [rentARoomIncome1, setRentARoomIncome1] = useState('');
  const [rentARoomIncome2, setRentARoomIncome2] = useState('');

  const taxDetails1 = calculateTaxDetails(grossIncome1);
  let taxDetails2 = hasSecondApplicant ? calculateTaxDetails(grossIncome2) : null;

  useEffect(() => {
    if (hasSecondApplicant) {
      setAnnualHomeownerFees(totalAnnualFees / 2);
    } else {
      setAnnualHomeownerFees(totalAnnualFees);
    }
  }, [totalAnnualFees, hasSecondApplicant]);

  const handleRentARoomIncomeChange1 = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      if (value > 14000 / 12) {
        setRentARoomIncome1(14000 / 12);
        alert("Rent a Room tax relief is capped at €14000 per annum.");
      } else {
        setRentARoomIncome1(value);
      }
    } else {
      setRentARoomIncome1('');
    }
  };

  const handleRentARoomIncomeChange2 = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      if (value > 14000 / 12) {
        setRentARoomIncome2(14000 / 12);
        alert("Rent a Room tax relief is capped at €14000 per annum.");
      } else {
        setRentARoomIncome2(value);
      }
    } else {
      setRentARoomIncome2('');
    }
  };

  ;

  return (
    <div>
      <h2>Financial Planner</h2>
      <div class="">
        <div>
          <p>Gross Income: €{grossIncome1.toFixed(2)}</p>
          <p>PAYE: €{taxDetails1.paye.toFixed(2)}</p>
          <p>USC: €{taxDetails1.usc.toFixed(2)}</p>
          <p>PRSI: €{taxDetails1.prsi.toFixed(2)}</p>
          <p>Tax Credits: €{taxDetails1?.taxCredits?.toFixed(2)}</p>
          <p>Net Income: €{taxDetails1?.netIncome?.toFixed(2)}</p>
          <p>Net Monthly: €{taxDetails1?.netMonthlyIncome?.toFixed(2)}</p>
          <p>Net Weekly: €{taxDetails1?.netWeeklyIncome?.toFixed(2)}</p>
          <p>Annual Homeowner Fees: €{annualHomeownerFees.toFixed(2)}</p>
          <label>
            Rent a Room Monthly Income:
            <input 
              type="number"
              value={rentARoomIncome1}
              onChange={handleRentARoomIncomeChange1}
            />
          </label>

          {hasSecondApplicant && taxDetails2 && (
            <>
              <p>Gross Income: €{grossIncome2.toFixed(2)}</p>
              <p>PAYE: €{taxDetails2.paye.toFixed(2)}</p>
              <p>USC: €{taxDetails2.usc.toFixed(2)}</p>
              <p>PRSI: €{taxDetails2.prsi.toFixed(2)}</p>
              <p>Tax Credits: €{taxDetails2?.taxCredits?.toFixed(2)}</p>
              <p>Net Income: €{taxDetails2?.netIncome?.toFixed(2)}</p>
              <p>Net Monthly: €{taxDetails2?.netMonthlyIncome?.toFixed(2)}</p>
              <p>Net Weekly: €{taxDetails2?.netWeeklyIncome?.toFixed(2)}</p>
              <p>Annual Homeowner Fees: €{annualHomeownerFees.toFixed(2)}</p>
              <label>
                Rent a Room Monthly Income:
                <input 
                  type="number"
                  value={rentARoomIncome2}
                  onChange={handleRentARoomIncomeChange2}
                />
              </label>

            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default FinancialPlanner;
