import React, { useState, useEffect  } from 'react';
import { calculateTaxDetails } from './utilities/taxCalc.js';
import { generateRepaymentSchedule } from './utilities/mortgageInterestCalc.js';

const FinancialPlanner = ({
    totalAnnualFees,
    loanTerm,
    hasSecondApplicant,
    applicantIncomes,
    monthlyPayment,
    principal,
    annualInterestRate
  }) => {

  const [annualSavings1, setAnnualSavings1] = useState(0);
  const [annualSavings2, setAnnualSavings2] = useState(0);
  

  const [yearsUntilSavingsExceed1, setYearsUntilSavingsExceed1] = useState(-1);
  const [yearsUntilSavingsExceed2, setYearsUntilSavingsExceed2] = useState(-1);

  const grossIncome1 = applicantIncomes[0] || 0;
  const grossIncome2 = hasSecondApplicant ? (applicantIncomes[1] || 0) : 0;

  const [annualHomeownerFees, setAnnualHomeownerFees] = useState(totalAnnualFees);

  const [splitMonthlyPayment1, setSplitMonthlyPayment1] = useState(monthlyPayment);
  const [splitMonthlyPayment2, setSplitMonthlyPayment2] = useState(0);

  const [rentARoomIncome1, setRentARoomIncome1] = useState('');
  const [rentARoomIncome2, setRentARoomIncome2] = useState('');

  const taxDetails1 = calculateTaxDetails(grossIncome1);
  let taxDetails2 = hasSecondApplicant ? calculateTaxDetails(grossIncome2) : null;

  const [monthlyDiscretionary1, setMonthlyDiscretionary1] = useState('');
  const [monthlyBills1, setMonthlyBills1] = useState('');
  const [annualExpenses1, setAnnualExpenses1] = useState('');
  const [savingGoals1, setSavingGoals1] = useState('');
  const [windfalls1, setWindfalls1] = useState('');

  const [monthlyDiscretionary2, setMonthlyDiscretionary2] = useState('');
  const [monthlyBills2, setMonthlyBills2] = useState('');
  const [annualExpenses2, setAnnualExpenses2] = useState('');
  const [savingGoals2, setSavingGoals2] = useState('');
  const [windfalls2, setWindfalls2] = useState('');
  const [otherIncome1, setOtherIncome1] = useState('');
  const [otherIncome2, setOtherIncome2] = useState('');

  useEffect(() => {
    // Calculate annual savings for applicant 1
    const otherIncome1Parsed = parseFloat(otherIncome1) || 0;
    const taxDetails1 = calculateTaxDetails(grossIncome1 + otherIncome1Parsed);
    const rentIncomeAnnual1 = (parseFloat(rentARoomIncome1) || 0) * 12;
    const totalIncomeAnnual1 = taxDetails1.netIncome + rentIncomeAnnual1;

    // Ensure all monthly figures are parsed to float and summed up correctly before multiplying by 12
    const totalMonthlyOutgoings1 = parseFloat(splitMonthlyPayment1) + (parseFloat(monthlyDiscretionary1) || 0) + (parseFloat(monthlyBills1) || 0);
    const totalOutAnnual1 = totalMonthlyOutgoings1 * 12 + annualHomeownerFees + (parseFloat(annualExpenses1) || 0);

    setAnnualSavings1(totalIncomeAnnual1 - totalOutAnnual1);

    if (hasSecondApplicant) {
      // Repeat the calculation for applicant 2
      const otherIncome2Parsed = parseFloat(otherIncome2) || 0;
      const taxDetails2 = calculateTaxDetails(grossIncome2 + otherIncome2Parsed);
      const rentIncomeAnnual2 = (parseFloat(rentARoomIncome2) || 0) * 12;
      const totalIncomeAnnual2 = taxDetails2.netIncome + rentIncomeAnnual2;

      const totalMonthlyOutgoings2 = parseFloat(splitMonthlyPayment2) + (parseFloat(monthlyDiscretionary2) || 0) + (parseFloat(monthlyBills2) || 0);
      const totalOutAnnual2 = totalMonthlyOutgoings2 * 12 + annualHomeownerFees + (parseFloat(annualExpenses2) || 0);

      setAnnualSavings2(totalIncomeAnnual2 - totalOutAnnual2);
    }
  }, [
    grossIncome1,
    grossIncome2,
    otherIncome1,
    otherIncome2,
    rentARoomIncome1,
    rentARoomIncome2,
    splitMonthlyPayment1,
    splitMonthlyPayment2,
    monthlyDiscretionary1,
    monthlyDiscretionary2,
    monthlyBills1,
    monthlyBills2,
    annualExpenses1,
    annualExpenses2,
    annualHomeownerFees,
    hasSecondApplicant
  ]);

  useEffect(() => {
    if (hasSecondApplicant) {
      setAnnualHomeownerFees(totalAnnualFees / 2);
      setSplitMonthlyPayment1(monthlyPayment / 2);
      setSplitMonthlyPayment2(monthlyPayment / 2);
    } else {
      setAnnualHomeownerFees(totalAnnualFees);
      setSplitMonthlyPayment1(monthlyPayment);
      setSplitMonthlyPayment2(0);
    }
  }, [totalAnnualFees, hasSecondApplicant, monthlyPayment]);

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

  useEffect(() => {
    // Assuming some values for missing parameters
    const windfall1 = parseFloat(windfalls1) || 0;
    const savings1 = parseFloat(savingGoals1) || 0;
    const otherIncome1Parsed = parseFloat(otherIncome1) || 0;
    
    const years1 = calculateYearsUntilSavingsExceedOpening(
      grossIncome1,
      otherIncome1Parsed,
      parseFloat(splitMonthlyPayment1),
      parseFloat(monthlyDiscretionary1) || 0,
      parseFloat(monthlyBills1) || 0,
      annualHomeownerFees,
      parseFloat(savingGoals1) || 0,
      parseFloat(annualExpenses1) || 0,
      principal,
      annualInterestRate,
      loanTerm,
      windfall1,
      savings1
    );

    setYearsUntilSavingsExceed1(years1);

    if (hasSecondApplicant) {
      const windfall2 = parseFloat(windfalls2) || 0;
      const savings2 = parseFloat(savingGoals2) || 0;
      const otherIncome2Parsed = parseFloat(otherIncome2) || 0;

      const years2 = calculateYearsUntilSavingsExceedOpening(
        grossIncome2,
        otherIncome2Parsed,
        parseFloat(splitMonthlyPayment2),
        parseFloat(monthlyDiscretionary2) || 0,
        parseFloat(monthlyBills2) || 0,
        annualHomeownerFees,
        parseFloat(savingGoals2) || 0,
        parseFloat(annualExpenses2) || 0,
        principal,
        annualInterestRate,
        loanTerm,
        windfall2,
        savings2
      );

      setYearsUntilSavingsExceed2(years2);
    }
  }, [hasSecondApplicant, applicantIncomes, monthlyPayment]);

  const handleMonthlyDiscretionaryChange1 = (e) => setMonthlyDiscretionary1(e.target.value);
  const handleMonthlyBillsChange1 = (e) => setMonthlyBills1(e.target.value);
  const handleAnnualExpensesChange1 = (e) => setAnnualExpenses1(e.target.value);
  const handleSavingGoalsChange1 = (e) => setSavingGoals1(e.target.value);
  const handleWindfallsChange1 = (e) => setWindfalls1(e.target.value);
  const handleOtherIncomeChange1 = (e) => setOtherIncome1(e.target.value);

  const handleMonthlyDiscretionaryChange2 = (e) => setMonthlyDiscretionary2(e.target.value);
  const handleMonthlyBillsChange2 = (e) => setMonthlyBills2(e.target.value);
  const handleAnnualExpensesChange2 = (e) => setAnnualExpenses2(e.target.value);
  const handleSavingGoalsChange2 = (e) => setSavingGoals2(e.target.value);
  const handleWindfallsChange2 = (e) => setWindfalls2(e.target.value);
  const handleOtherIncomeChange2 = (e) => setOtherIncome2(e.target.value);

  function calculateYearsUntilSavingsExceedOpening(
    grossIncome,
    otherTaxableIncome,
    monthlyRepayments,
    discretionary,
    bills,
    annualHomeownersFees,
    savingsGoals,
    annualExpenses,
    principal,
    annualInterestRate,
    termYears,
    windfall,
    savings
  ) {
    let year = 0;
    const newGrossIncome = grossIncome + otherTaxableIncome;
    const taxDetails = calculateTaxDetails(newGrossIncome);
    const newNetAnnual = taxDetails.netIncome;
  
    const annualOutWithoutHomeowners = (monthlyRepayments + discretionary + bills) * 12;
    const fullAnnualOut = annualOutWithoutHomeowners + annualHomeownersFees + savingsGoals + annualExpenses;
  
    const repaymentSchedule = generateRepaymentSchedule(principal, annualInterestRate, termYears);
  
    for (const yearData of repaymentSchedule) {
      const adjustedOpeningBalance = yearData.openingBalance - windfall - savings;
      const newSavings = newNetAnnual - fullAnnualOut;
  
      if (newSavings > adjustedOpeningBalance) {
        return year;
      }
  
      year++;
    }
  
    return -1;
  }
  ;

  return (
    <div>
      <h2>Financial Planner</h2>
      <div class="">
        <div class="applicant first-applicant">
          <h5>Applicant 1</h5>
          <p>Gross Income: €{grossIncome1.toFixed(2)}</p>
          <p>PAYE: €{taxDetails1.paye.toFixed(2)}</p>
          <p>USC: €{taxDetails1.usc.toFixed(2)}</p>
          <p>PRSI: €{taxDetails1.prsi.toFixed(2)}</p>
          <p>Tax Credits: €{taxDetails1?.taxCredits?.toFixed(2)}</p>
          <p>Net Income: €{taxDetails1?.netIncome?.toFixed(2)}</p>
          <p>Net Monthly: €{taxDetails1?.netMonthlyIncome?.toFixed(2)}</p>
          <p>Net Weekly: €{taxDetails1?.netWeeklyIncome?.toFixed(2)}</p>
          <label>
            Rent a Room Monthly Income:
            <input 
              type="number"
              value={rentARoomIncome1}
              onChange={handleRentARoomIncomeChange1}
            />
          </label>
          <label>
            Windfalls:
            <input type="number" value={windfalls1} onChange={handleWindfallsChange1} />
          </label>
          <label>
            Other Expected Taxable Income:
            <input type="number" value={otherIncome1} onChange={handleOtherIncomeChange1} />
          </label>

          <p>Applicant 1's Portion of Monthly Payment: €{splitMonthlyPayment1.toFixed(2)}</p>
          <label>
            Monthly Discretionary:
            <input type="number" value={monthlyDiscretionary1} onChange={handleMonthlyDiscretionaryChange1} />
          </label>
          <label>
            Monthly Bills:
            <input type="number" value={monthlyBills1} onChange={handleMonthlyBillsChange1} />
          </label>
          <label>
            Annual Expenses:
            <input type="number" value={annualExpenses1} onChange={handleAnnualExpensesChange1} />
          </label>
          <label>
            Saving Goals:
            <input type="number" value={savingGoals1} onChange={handleSavingGoalsChange1} />
          </label>
          <p>Annual Homeowner Fees: €{annualHomeownerFees.toFixed(2)}</p>

          <p>Annual Savings for Applicant 1: €{annualSavings1.toFixed(2)}</p>
          <p>Years until savings exceed opening balance for Applicant 1: {yearsUntilSavingsExceed1}</p>
        </div>

        {hasSecondApplicant && taxDetails2 && (
          <>
            <div class="applicant second-applicant">
              <h5>Applicant 2</h5>
              <p>Gross Income: €{grossIncome2.toFixed(2)}</p>
              <p>PAYE: €{taxDetails2.paye.toFixed(2)}</p>
              <p>USC: €{taxDetails2.usc.toFixed(2)}</p>
              <p>PRSI: €{taxDetails2.prsi.toFixed(2)}</p>
              <p>Tax Credits: €{taxDetails2?.taxCredits?.toFixed(2)}</p>
              <p>Net Income: €{taxDetails2?.netIncome?.toFixed(2)}</p>
              <p>Net Monthly: €{taxDetails2?.netMonthlyIncome?.toFixed(2)}</p>
              <p>Net Weekly: €{taxDetails2?.netWeeklyIncome?.toFixed(2)}</p>
              <label>
                Rent a Room Monthly Income:
                <input 
                  type="number"
                  value={rentARoomIncome2}
                  onChange={handleRentARoomIncomeChange2}
                />
              </label>
              <label>
                Windfalls:
                <input type="number" value={windfalls2} onChange={handleWindfallsChange2} />
              </label>
              <label>
                Other Expected Taxable Income:
                <input type="number" value={otherIncome2} onChange={handleOtherIncomeChange2} />
              </label>

              <p>Applicant 2's Portion of Monthly Payment: €{splitMonthlyPayment2.toFixed(2)}</p>
              <label>
                Monthly Discretionary:
                <input type="number" value={monthlyDiscretionary2} onChange={handleMonthlyDiscretionaryChange2} />
              </label>
              <label>
                Monthly Bills:
                <input type="number" value={monthlyBills2} onChange={handleMonthlyBillsChange2} />
              </label>
              <label>
                Annual Expenses:
                <input type="number" value={annualExpenses2} onChange={handleAnnualExpensesChange2} />
              </label>
              <label>
                Saving Goals:
                <input type="number" value={savingGoals2} onChange={handleSavingGoalsChange2} />
              </label>
              <p>Annual Homeowner Fees: €{annualHomeownerFees.toFixed(2)}</p>

              <p>Annual Savings for Applicant 2: €{annualSavings2.toFixed(2)}</p>
              <p>Years until savings exceed opening balance for Applicant 2: {yearsUntilSavingsExceed2}</p>

            </div>

          </>
          )}

        </div>
      </div>
  );
};

export default FinancialPlanner;
