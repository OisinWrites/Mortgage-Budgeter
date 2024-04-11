import React, { useState, useEffect } from 'react';
import './App.css';
import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';
import MortgageDetails from './components/MortgageDetails';
import FinancialPlanner from './components/FinancialPlanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import DepositSavingPeriod from './components/DepositSavingPeriod';


function App() {
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(true);
  const [effectiveMaxBorrow, setEffectiveMaxBorrow] = useState(0);
  const [numberOfApplicants, setNumberOfApplicants] = useState(1);
  const [housePrice, setHousePrice] = useState('');
  const [mortgageDesired, setMortgageDesired] = useState('');
  const [netIncome, setNetIncome] = useState('');
  const [netIncome2, setNetIncome2] = useState('');
  const [totalAnnualFees, setTotalAnnualFees] = useState(0);
  const [applicantIncomes, setApplicantIncomes] = useState([null]);
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [propertyValue, setPropertyValue] = useState(0);

  useEffect(() => {
    const loanToValueRatio = isFirstTimeBuyer ? 0.9 : 0.8;
    // Ensure effectiveMaxBorrow is a number. If not, default to 0 before calculation.
    const effectiveBorrow = Number(effectiveMaxBorrow) || 0;
    const calculatedPropertyValue = parseFloat((effectiveBorrow / loanToValueRatio).toFixed(2));
  
    setPropertyValue(calculatedPropertyValue);
  }, [effectiveMaxBorrow, isFirstTimeBuyer, setPropertyValue]);

  // Function to be passed to DepositSavingPeriod
  const updateTotalAnnualFees = (newTotal) => {
      setTotalAnnualFees(newTotal);
  };

  const handleLoanTermChange = (term) => {
    setLoanTerm(term);
  };

  // Handler to update gross incomes
  const handleIncomeChange = (index, value) => {
    const newIncomes = [...applicantIncomes];
    newIncomes[index] = Number(value) || null;
    setApplicantIncomes(newIncomes);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="display-1">Life Ladder</h1>
        <br></br>
        <h2>Mortgage and Savings Calculator</h2>
      </header>
      <main className="mortgage-budgeteer pb-3">
        <div className="bcc">
          <div className="section">
            <BorrowingCapacityCalculator
              propertyValue={propertyValue}
              effectiveMaxBorrow={effectiveMaxBorrow}
              setEffectiveMaxBorrow={setEffectiveMaxBorrow}
              applicantIncomes={applicantIncomes}
              onIncomeChange={handleIncomeChange}
              isFirstTimeBuyer={isFirstTimeBuyer}
              setIsFirstTimeBuyer={setIsFirstTimeBuyer}
              setNumberOfApplicants={setNumberOfApplicants}
            />
          </div>
        </div>
        <div className="dsp">
          <div className="section">
            <DepositSavingPeriod 
              propertyValue={propertyValue}      
              effectiveMaxBorrow={effectiveMaxBorrow} 
              isFirstTimeBuyer={isFirstTimeBuyer} 
              hasSecondApplicant={numberOfApplicants > 1}
              updateTotalAnnualFees={updateTotalAnnualFees}
              housePrice={housePrice}
              setHousePrice={setHousePrice}
              mortgageDesired={mortgageDesired}
              setMortgageDesired={setMortgageDesired}
              netIncome={netIncome} 
              setNetIncome={setNetIncome} 
              netIncome2={netIncome2} 
              setNetIncome2={setNetIncome2}
            />
          </div>
        </div>
        <div className="mod">
          <div className="section pb-3">
          <MortgageDetails
            updateMonthlyPayment={setMonthlyPayment}
            isFirstTimeBuyer={isFirstTimeBuyer}
            housePrice={housePrice}
            annualInterestRate={annualInterestRate}
            setAnnualInterestRate={setAnnualInterestRate}
            mortgageDesired={mortgageDesired}
            onLoanTermChange={handleLoanTermChange}
            loanTerm={loanTerm}
            setLoanTerm={setLoanTerm}
          />
          </div>
        </div>
        <div className="fp">
          <div className="section mb-3">
          <FinancialPlanner
            monthlyPayment={monthlyPayment}
            applicantIncomes={applicantIncomes}
            hasSecondApplicant={numberOfApplicants > 1}
            totalAnnualFees={totalAnnualFees}
            mortgageDesired={mortgageDesired}
            annualInterestRate={annualInterestRate}        
            loanTerm={loanTerm}
          />
          </div>
        </div>
        <a className="image-credit" target="_blank" rel="noopener noreferrer" href='https://pngtree.com/freepng/house-home-puppy-hand-drawing_4088450.html'>png image from pngtree.com/</a>
      </main>
    </div>
  );
}

export default App;
