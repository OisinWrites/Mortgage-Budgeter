import React, { useState } from 'react';
import './App.css';
import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';
import MortgageDetails from './components/MortgageDetails';
import FinancialPlanner from './components/FinancialPlanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import DepositSavingPeriod from './components/DepositSavingPeriod';


function App() {
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(true);
  const [maxBorrow, setMaxBorrow] = useState(0);
  const [numberOfApplicants, setNumberOfApplicants] = useState(1);
  const [housePrice, setHousePrice] = useState('');
  const [mortgageDesired, setMortgageDesired] = useState('');
  const [netIncome, setNetIncome] = useState('');
  const [netIncome2, setNetIncome2] = useState('');
  const [totalAnnualFees, setTotalAnnualFees] = useState(0);

    // Function to be passed to DepositSavingPeriod
  const updateTotalAnnualFees = (newTotal) => {
      setTotalAnnualFees(newTotal);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 class="display-1">Life Ladder</h1>
        <br></br>
        <h2>Mortgage and Savings Calculator</h2>
      </header>
      <main class="mortgage-budgeteer pb-3">
        <div class="bcc">
          <div class="section">
            <BorrowingCapacityCalculator
              setMaxBorrow={setMaxBorrow}
              isFirstTimeBuyer={isFirstTimeBuyer}
              setIsFirstTimeBuyer={setIsFirstTimeBuyer}
              setNumberOfApplicants={setNumberOfApplicants}
            />
          </div>
        </div>
        <div class="dsp">
          <div class="section">
            <DepositSavingPeriod maxBorrow={maxBorrow} isFirstTimeBuyer={isFirstTimeBuyer} hasSecondApplicant={numberOfApplicants > 1}
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
        <div class="mod">
          <div class="section pb-3">
          <MortgageDetails
           isFirstTimeBuyer={isFirstTimeBuyer}
           housePrice={housePrice}
           mortgageDesired={mortgageDesired}
            />
          </div>
        </div>
        <div class="fp">
          <div class="section mb-3">
          <FinancialPlanner
            totalAnnualFees={totalAnnualFees} 
            netIncome={netIncome} 
            netIncome2={netIncome2}             
          />
          </div>
        </div>
        <a class="image-credit" target="_blank" rel="noopener noreferrer" href='https://pngtree.com/freepng/house-home-puppy-hand-drawing_4088450.html'>png image from pngtree.com/</a>
      </main>
    </div>
  );
}

export default App;
