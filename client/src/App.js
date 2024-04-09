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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mortgage and Savings Calculator</h1>
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
            <DepositSavingPeriod maxBorrow={maxBorrow} isFirstTimeBuyer={isFirstTimeBuyer} hasSecondApplicant={numberOfApplicants > 1}/>
          </div>
        </div>
        <div class="mod">
          <div class="section">
          <MortgageDetails isFirstTimeBuyer={isFirstTimeBuyer} />
          </div>
        </div>
        <div class="fp">
          <div class="section mb-3">
          <FinancialPlanner isFirstTimeBuyer={isFirstTimeBuyer} />
          </div>
        </div>
        <a class="image-credit" target="_blank" rel="noopener noreferrer" href='https://pngtree.com/freepng/house-home-puppy-hand-drawing_4088450.html'>png image from pngtree.com/</a>
      </main>
    </div>
  );
}

export default App;
