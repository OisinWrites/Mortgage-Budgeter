import React, { useState, useEffect  } from 'react';
import { calculateTaxDetails } from './utilities/taxCalc.js';
import { calculateMonthlyMortgagePayment, generateRepaymentSchedule } from './utilities/mortgageInterestCalc.js';
import { calculateAdjustedSalaries }from './utilities/IncomeAdjustments.js';

const FinancialPlanner = ({
    totalAnnualFees,
    loanTerm,
    hasSecondApplicant,
    applicantIncomes,
    monthlyPayment,
    principal,
    annualInterestRate,
    mortgageDesired
  }) => {

  const [repaymentSchedule, setRepaymentSchedule] = useState([]);

  const [salaryRaisesAndBonuses1, setSalaryRaisesAndBonuses1] = useState([]);
  const [salaryRaisesAndBonuses2, setSalaryRaisesAndBonuses2] = useState([]);

  const [showRaisesDiv, setShowRaisesDiv] = useState(false);
  const [showRaisesDiv2, setShowRaisesDiv2] = useState(false);
  const [annualSavings1, setAnnualSavings1] = useState(0);
  const [annualSavings2, setAnnualSavings2] = useState(0);

  const [yearsUntilSavingsExceed1, setYearsUntilSavingsExceed1] = useState(-1);
  const [yearsUntilSavingsExceed2, setYearsUntilSavingsExceed2] = useState(-1);

  const [annualHomeownerFees, setAnnualHomeownerFees] = useState(totalAnnualFees);

  const [splitMonthlyPayment1, setSplitMonthlyPayment1] = useState(monthlyPayment);
  const [splitMonthlyPayment2, setSplitMonthlyPayment2] = useState(0);

  const [rentARoomIncome1, setRentARoomIncome1] = useState('');
  const [rentARoomIncome2, setRentARoomIncome2] = useState('');

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

  // Function to toggle the visibility of the raises div
  const toggleRaisesDiv = () => {
    setShowRaisesDiv(!showRaisesDiv);
  };

  const toggleRaisesDiv2 = () => {
    setShowRaisesDiv2(!showRaisesDiv2);
  };

  // Function to close the raises div
  const closeRaisesDiv = () => {
    setShowRaisesDiv(false);
  };

  const closeRaisesDiv2 = () => {
    setShowRaisesDiv2(false);
  };

  const initRaisesAndBonuses = (loanTerm) => Array.from({length: loanTerm}, () => ({ raise: 0, bonus: 0 }));

  const salaryRaiseAndBonusInputs = salaryRaisesAndBonuses1
  .map((item, index) => (
    <div class="raise-dropdown container" key={`salary-raise-bonus-${index}`}>
      <div class="row">
        <span class="col-4">
          Year {index + 1} Raise { item.raise}%
        </span>
        <span class="col-3">
          <input
              type="range"
              min="0"
              max="25"
              value={item.raise}
              onChange={(e) => handleRaiseAndBonusChange(e, index, 1, 'raise')}
              style={{ width: '100%' }} // Style as needed
            />
        </span>
        <span class="col-5">
          <input
            class="col-5"
            placeholder="Bonus"
            type="number"
            value={item.bonus || ''} // Use an empty string to show placeholder when bonus is 0
            onChange={(e) => handleRaiseAndBonusChange(e, index, 1, 'bonus')}
            style={{ width: '100%' }}
          />
        </span>
      </div>
    </div>
  ));

  // Handler function needs to be adapted to update the correct applicant's state
  const handleRaiseAndBonusChange = (e, yearIndex, applicantNumber, field) => {
    const updatedValue = parseFloat(e.target.value) || 0;
    if (applicantNumber === 1) {
      setSalaryRaisesAndBonuses1(current =>
        current.map((item, index) => index === yearIndex ? {...item, [field]: updatedValue} : item)
      );
    } else if (applicantNumber === 2) {
      setSalaryRaisesAndBonuses2(current =>
        current.map((item, index) => index === yearIndex ? {...item, [field]: updatedValue} : item)
      );
    }
  };

  const grossIncome1 = applicantIncomes[0] || 0;
  const grossIncome2 = hasSecondApplicant ? (applicantIncomes[1] || 0) : 0;

  const taxDetails1 = calculateTaxDetails(grossIncome1);
  let taxDetails2 = hasSecondApplicant ? calculateTaxDetails(grossIncome2) : null;

  useEffect(() => {
    setSalaryRaisesAndBonuses1(initRaisesAndBonuses(loanTerm));
    setSalaryRaisesAndBonuses2(initRaisesAndBonuses(loanTerm));
  }, [loanTerm]);

  useEffect(() => {
    const taxDetails1 = calculateTaxDetails(grossIncome1);
    const rentIncomeAnnual1 = (parseFloat(rentARoomIncome1) || 0) * 12;
    const totalIncomeAnnual1 = taxDetails1.netIncome + rentIncomeAnnual1;

    const totalMonthlyOutgoings1 = parseFloat(splitMonthlyPayment1) + (parseFloat(monthlyDiscretionary1) || 0) + (parseFloat(monthlyBills1) || 0);
    const totalOutAnnual1 = totalMonthlyOutgoings1 * 12 + annualHomeownerFees + (parseFloat(annualExpenses1) || 0);

    setAnnualSavings1(totalIncomeAnnual1 - totalOutAnnual1);

    if (hasSecondApplicant) {
      const taxDetails2 = calculateTaxDetails(grossIncome2);
      const rentIncomeAnnual2 = (parseFloat(rentARoomIncome2) || 0) * 12;
      const totalIncomeAnnual2 = taxDetails2.netIncome + rentIncomeAnnual2;

      const totalMonthlyOutgoings2 = parseFloat(splitMonthlyPayment2) + (parseFloat(monthlyDiscretionary2) || 0) + (parseFloat(monthlyBills2) || 0);
      const totalOutAnnual2 = totalMonthlyOutgoings2 * 12 + annualHomeownerFees + (parseFloat(annualExpenses2) || 0);

      setAnnualSavings2(totalIncomeAnnual2 - totalOutAnnual2);
    }
  }, [
    grossIncome1,
    grossIncome2,
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

  useEffect(() => {
    if (mortgageDesired && loanTerm && annualInterestRate) {
      const schedule = generateRepaymentSchedule(mortgageDesired, annualInterestRate, loanTerm);
      setRepaymentSchedule(schedule);
    }
  }, [mortgageDesired, loanTerm, annualInterestRate]);

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

  const handleMonthlyDiscretionaryChange1 = (e) => setMonthlyDiscretionary1(e.target.value);
  const handleMonthlyBillsChange1 = (e) => setMonthlyBills1(e.target.value);
  const handleAnnualExpensesChange1 = (e) => setAnnualExpenses1(e.target.value);
  const handleSavingGoalsChange1 = (e) => setSavingGoals1(e.target.value);
  const handleWindfallsChange1 = (e) => setWindfalls1(e.target.value);

  const handleMonthlyDiscretionaryChange2 = (e) => setMonthlyDiscretionary2(e.target.value);
  const handleMonthlyBillsChange2 = (e) => setMonthlyBills2(e.target.value);
  const handleAnnualExpensesChange2 = (e) => setAnnualExpenses2(e.target.value);
  const handleSavingGoalsChange2 = (e) => setSavingGoals2(e.target.value);
  const handleWindfallsChange2 = (e) => setWindfalls2(e.target.value);

  // Calculate adjusted salaries and bonuses for both applicants
  const adjustedSalaries1 = calculateAdjustedSalaries(applicantIncomes[0], salaryRaisesAndBonuses1);
  const adjustedSalaries2 = hasSecondApplicant ? calculateAdjustedSalaries(applicantIncomes[1], salaryRaisesAndBonuses2) : [];

  // Render the adjusted salaries and bonuses as lists
  const adjustedSalariesList1 = adjustedSalaries1
  .filter((item, index) => {
    // Check if there's a raise or bonus for the year
    const raiseAndBonus = salaryRaisesAndBonuses1[index];
    return raiseAndBonus.raise !== 0 || raiseAndBonus.bonus !== 0;
  })
  .map(item => (
    <li key={`applicant1-year-${item.year}`}>
      Year {item.year}: Salary - ${item.salary.toFixed(2)} (Base Salary: ${item.baseSalary.toFixed(2)}, Bonus: ${item.bonus})
    </li>
  ));

  const adjustedSalariesList2 = adjustedSalaries2
  .filter((item, index) => {
    // Check if there's a raise or bonus for the year
    const raiseAndBonus = salaryRaisesAndBonuses2[index];
    return raiseAndBonus.raise !== 0 || raiseAndBonus.bonus !== 0;
  })
  .map(item => (
    <li key={`applicant2-year-${item.year}`}>
      Year {item.year}: Salary - ${item.salary.toFixed(2)} (Base Salary: ${item.baseSalary.toFixed(2)}, Bonus: ${item.bonus})
    </li>
  ));

  const renderNetIncomeList = (adjustedSalaries) => {
    if (!Array.isArray(adjustedSalaries)) {
      return null;
    }
    
    return adjustedSalaries.map((item, index) => {
      const taxDetails = calculateTaxDetails(item.salary); // item.salary includes bonuses
      const netIncome = taxDetails.netIncome; // Assuming calculateTaxDetails returns an object with a netIncome property
      return (
        <li key={`net-income-${index}`}>
          Year {item.year}: Net Income - €{netIncome.toFixed(2)}
        </li>
      );
    });
  };

  let salaryRaiseAndBonusInputs2 = null;
  if (hasSecondApplicant) {
      salaryRaiseAndBonusInputs2 = salaryRaisesAndBonuses2.map((item, index) => (
          <div className="raise-dropdown container" key={`applicant2-salary-raise-bonus-${index}`}>
              <div class="row">
                  <span class="col-4">
                      Year {index + 1} Raise {item.raise}%
                  </span>
                  <span class="col-3">
                      <input
                          type="range"
                          min="0"
                          max="25"
                          value={item.raise}
                          onChange={(e) => handleRaiseAndBonusChange(e, index, 2, 'raise')}
                          style={{ width: '100%' }}
                      />
                  </span>
                  <span class="col-5">
                      <input
                          class="col-5"
                          placeholder="Bonus"
                          type="number"
                          value={item.bonus || ''}
                          onChange={(e) => handleRaiseAndBonusChange(e, index, 2, 'bonus')}
                          style={{ width: '100%' }}
                      />
                  </span>
              </div>
          </div>
      ));
  }
  
  // Using the adjusted salaries to calculate and render net incomes
  const netIncomeList1 = adjustedSalaries1 ? renderNetIncomeList(adjustedSalaries1) : null;
  const netIncomeList2 = hasSecondApplicant ? renderNetIncomeList(adjustedSalaries2) : null;

  ;

  return (
    <div class="">
      <h2>Financial Planner</h2>
      <div class="">
        <div class="applicant first-applicant">
        {hasSecondApplicant && (
            <h5>Applicant 1</h5>
          )}
          <div>
          <hr></hr>
          <p>Gross Income: €{grossIncome1.toFixed(2)}</p>
          <div>
            <button onClick={toggleRaisesDiv}>Future Salary & Income Adjustments</button>
            
            {showRaisesDiv && (
              <div id="raises">
                <div class="spin-reel rounded">
                  {salaryRaiseAndBonusInputs}
                </div>
              </div>
            )}
          </div>
          <ul>{adjustedSalariesList1}</ul>
          <label>
            Rent a Room Relief:
            <input 
              type="number"
              value={rentARoomIncome1}
              onChange={handleRentARoomIncomeChange1}
              placeholder=' Tax-free if < €14k'
            />
          </label>
          <label>
            Windfalls:
            <input type="number" value={windfalls1} placeholder=" Tax-free amounts" onChange={handleWindfallsChange1} />
          </label>
          <hr></hr>
          <p> {hasSecondApplicant && (<>Applicant 1's Half of</>)} Monthly Mortgage Payment: €{splitMonthlyPayment1.toFixed(2)}</p>
          <p>Annual Homeowner Fees: €{annualHomeownerFees.toFixed(2)}</p>
          <label>
            Monthly Bills:
            <input type="number" value={monthlyBills1} onChange={handleMonthlyBillsChange1} placeholder={' Groceries & Utilities'}/>
          </label>
          <label>
            Monthly Discretionary:
            <input type="number" value={monthlyDiscretionary1} onChange={handleMonthlyDiscretionaryChange1} placeholder={' The Good Stuff'}/>
          </label>
          <label>
            Annual Expenses:
            <input type="number" value={annualExpenses1} onChange={handleAnnualExpensesChange1} placeholder={' Once per year bills'}/>
          </label>
          <label>
            Saving Goals:
            <input type="number" value={savingGoals1} onChange={handleSavingGoalsChange1} placeholder={' Non-mortgage targets'}/>
          </label>
          <hr></hr>
          <p class="pb-3">Annual Surplus: €{annualSavings1.toFixed(2)}</p>
        </div>
          </div>

        {hasSecondApplicant && taxDetails2 && (
          <>
            <div class="applicant second-applicant mt-3">
              <h5>Applicant 2</h5>
              <div>
                <hr></hr>
                <p>Gross Income: €{grossIncome2.toFixed(2)}</p>
                <div>
                  <button onClick={toggleRaisesDiv2}>Future Salary & Income Adjustments</button>                  
                  {showRaisesDiv2 && (
                    <div id="raises2">
                      <div class="spin-reel rounded">
                        {salaryRaiseAndBonusInputs2}
                      </div>
                    </div>
                  )}
                </div>
                <ul>{adjustedSalariesList2}</ul>
                <label>
                  Rent a Room Relief:
                  <input 
                    type="number"
                    value={rentARoomIncome2}
                    onChange={handleRentARoomIncomeChange1}
                    placeholder=' Tax-free if < €14k'
                  />
                </label>
                <label>
                  Windfalls:
                  <input type="number" value={windfalls2} placeholder=" Tax-free amounts" onChange={handleWindfallsChange2} />
                </label>
                <hr></hr>
                <p>Applicant 2's Half of Monthly Mortgage Payment: €{splitMonthlyPayment2.toFixed(2)}</p>
                <p>Annual Homeowner Fees: €{annualHomeownerFees.toFixed(2)}</p>
                <label>
                  Monthly Bills:
                  <input type="number" value={monthlyBills2} onChange={handleMonthlyBillsChange2} placeholder={' Groceries & Utilities'}/>
                </label>
                <label>
                  Monthly Discretionary:
                  <input type="number" value={monthlyDiscretionary2} onChange={handleMonthlyDiscretionaryChange2} placeholder={' The Good Stuff'}/>
                </label>
                <label>
                  Annual Expenses:
                  <input type="number" value={annualExpenses2} onChange={handleAnnualExpensesChange2} placeholder={' Once per year bills'}/>
                </label>
                <label>
                  Non-Mortgage Saving Goals:
                  <input type="number" value={savingGoals2} onChange={handleSavingGoalsChange2} placeholder={' Non-mortgage targets'}/>
                </label>
                <hr></hr>
                <p class="pb-3">Annual Surplus: €{annualSavings2.toFixed(2)}</p>

              </div>
            </div>

          </>
          )}

        </div>
      </div>
  );
};

export default FinancialPlanner;
