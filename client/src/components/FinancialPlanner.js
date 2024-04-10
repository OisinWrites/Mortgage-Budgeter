import React, { useState, useEffect  } from 'react';
import { calculateTaxDetails } from './utilities/taxCalc.js';
import { generateRepaymentSchedule } from './utilities/mortgageInterestCalc.js';
import { calculateAdjustedSalaries }from './utilities/IncomeAdjustments.js';

const FinancialPlanner = ({
    totalAnnualFees,
    loanTerm,
    hasSecondApplicant,
    applicantIncomes,
    monthlyPayment,
    annualInterestRate,
    mortgageDesired
  }) => {

  const [capitalGains1, setCapitalGains1] = useState('');
  const [capitalGains2, setCapitalGains2] = useState('');

  const [repaymentSchedule, setRepaymentSchedule] = useState([]);

  const [salaryRaisesAndBonuses1, setSalaryRaisesAndBonuses1] = useState([]);
  const [salaryRaisesAndBonuses2, setSalaryRaisesAndBonuses2] = useState([]);

  const [showRaisesDiv, setShowRaisesDiv] = useState(false);
  const [showRaisesDiv2, setShowRaisesDiv2] = useState(false);
  const [annualSavings1, setAnnualSavings1] = useState(0);
  const [annualSavings2, setAnnualSavings2] = useState(0);

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
      if (value > 14000) {
        setRentARoomIncome1(14000);
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
      if (value > 14000) {
        setRentARoomIncome2(14000);
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

  const adjustedSalaries1 = calculateAdjustedSalaries(applicantIncomes[0], salaryRaisesAndBonuses1);
  const adjustedSalaries2 = hasSecondApplicant ? calculateAdjustedSalaries(applicantIncomes[1], salaryRaisesAndBonuses2) : [];
 
  const adjustedSalariesList1 = adjustedSalaries1
  .filter((item, index) => {
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
    const raiseAndBonus = salaryRaisesAndBonuses2[index];
    return raiseAndBonus.raise !== 0 || raiseAndBonus.bonus !== 0;
  })
  .map(item => (
    <li key={`applicant2-year-${item.year}`}>
      Year {item.year}: Salary - ${item.salary.toFixed(2)} (Base Salary: ${item.baseSalary.toFixed(2)}, Bonus: ${item.bonus})
    </li>
  ));

  // Function to calculate net income after tax for each year
  const calculateNetIncomes = (grossIncomes, raisesAndBonuses) => {
    return grossIncomes.map((income, index) => {
      // Assuming tax calculation adjusts gross income based on raises and bonuses
      const taxDetails = calculateTaxDetails(income + (raisesAndBonuses[index].bonus || 0));
      return taxDetails.netIncome; // Assuming this is the net income after tax
    });
  };

  const renderNetIncomeList = (adjustedSalaries) => {
    if (!Array.isArray(adjustedSalaries)) {
      return null;
    }
    
    return adjustedSalaries.map((item, index) => {
      const taxDetails = calculateTaxDetails(item.salary);
      const netIncome = taxDetails.netIncome;
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

  // Function to calculate annual surplus
  const calculateAnnualSurplus = (
    income, roomRelief, bills, discretionary, annualExpenses, monthlyMortgagePayment, homeownerFees
  ) => {
    const monthlyCosts = (bills + discretionary) * 12;
    const annualMortgagePayments = monthlyMortgagePayment * 12;
    return income + roomRelief - monthlyCosts - annualExpenses - annualMortgagePayments - homeownerFees;
  };

  // Adjusted function to calculate the surpluses for each year in the loan term
  const calculateSurpluses = (
    netIncomes, roomIncomes, bills, discretionary, expenses, loanTerm, monthlyMortgagePayment, homeownerFees
  ) => {
    let surpluses = [];
    let cumulativeSurplus = 0;

    for (let year = 0; year < loanTerm; year++) {
      const netIncome = netIncomes[year] || netIncomes[netIncomes.length - 1]; // Use the last known net income if beyond specified raises
      const annualSurplus = netIncome + roomIncomes - ((bills + discretionary) * 12) - expenses - (monthlyMortgagePayment * 12) - homeownerFees;
      cumulativeSurplus += annualSurplus;
      surpluses.push({ annualSurplus, cumulativeSurplus });
    }

    return surpluses;
  };

  const netIncomes1 = calculateNetIncomes(adjustedSalaries1.map(item => item.salary), salaryRaisesAndBonuses1);
  const surplusDetails1 = calculateSurpluses(
    netIncomes1,
    parseFloat(rentARoomIncome1) || 0,
    parseFloat(monthlyBills1) || 0,
    parseFloat(monthlyDiscretionary1) || 0,
    parseFloat(annualExpenses1) || 0,
    loanTerm,
    parseFloat(splitMonthlyPayment1),
    parseFloat(annualHomeownerFees)
  );
  
  let surplusDetails2 = [];
  if (hasSecondApplicant) {
    const netIncomes2 = calculateNetIncomes(adjustedSalaries2.map(item => item.salary), salaryRaisesAndBonuses2);
    surplusDetails2 = calculateSurpluses(
      netIncomes2,
      parseFloat(rentARoomIncome2) || 0,
      parseFloat(monthlyBills2) || 0,
      parseFloat(monthlyDiscretionary2) || 0,
      parseFloat(annualExpenses2) || 0,
      loanTerm,
      parseFloat(splitMonthlyPayment2),
      parseFloat(annualHomeownerFees)
    );
  }


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
          <ul>{netIncomeList1}</ul>
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
          <label>
            Capital Gains:
            <input type="number" value={capitalGains1} onChange={(e) => setCapitalGains1(e.target.value)} placeholder=" 33% tax after €1270" />
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
          <div class="container pb-2">
            <div class="spin-reel">
              <div class="row">
                <span class="col-2">Year</span>
                <span class="col-5">Annual Surplus</span>
                <span class="col-5">Cumulative Surplus</span>
              </div>
              <hr></hr>
              {surplusDetails1.map((detail, index) => (
                <div class="row" key={index}>
                  <span class="col-2">{index + 1}:</span>
                  <span class="col-5">€{detail.annualSurplus.toFixed(2)}</span>
                  <span class="col-5">€{detail.cumulativeSurplus.toFixed(2)}</span>
                </div>
              ))}
            </div>
        </div>

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
                    onChange={handleRentARoomIncomeChange2}
                    placeholder=' Tax-free if < €14k'
                  />
                </label>
                <label>
                  Windfalls:
                  <input type="number" value={windfalls2} placeholder=" Tax-free amounts" onChange={handleWindfallsChange2} />
                </label>
                <label>
                  Capital Gains:
                  <input type="number" value={capitalGains2} onChange={(e) => setCapitalGains2(e.target.value)} placeholder=" 33% tax after €1270" />
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
                <div class="container pb-2">
                    <div class="spin-reel">
                      <div class="row">
                        <span class="col-2">Year</span>
                        <span class="col-5">Annual Surplus</span>
                        <span class="col-5">Cumulative Surplus</span>
                      </div>
                      <hr></hr>
                      {surplusDetails2.map((detail, index) => (
                        <div class="row" key={index}>
                          <span class="col-2">{index + 1}:</span>
                          <span class="col-5">€{detail.annualSurplus.toFixed(2)}</span>
                          <span class="col-5">€{detail.cumulativeSurplus.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>

          </>
          )}

        </div>
      </div>
  );
};

export default FinancialPlanner;
