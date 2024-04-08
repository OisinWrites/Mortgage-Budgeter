import React, { useState } from 'react';
import './App.css';
import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';
import MortgageDetails from './components/MortgageDetails';
import FinancialPlanner from './components/FinancialPlanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import DepositSavingPeriod from './components/DepositSavingPeriod';


function App() {
  // State to track if the user is a first-time buyer
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(true);
  const [maxBorrow, setMaxBorrow] = useState(0); // Assume this is calculated somewhere in App

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mortgage and Savings Calculator</h1>
      </header>
      <main class="mortgage-budgeteer">
        <BorrowingCapacityCalculator
          setMaxBorrow={setMaxBorrow}
          isFirstTimeBuyer={isFirstTimeBuyer}
          setIsFirstTimeBuyer={setIsFirstTimeBuyer}
        />
        <DepositSavingPeriod maxBorrow={maxBorrow} isFirstTimeBuyer={isFirstTimeBuyer} />
        <MortgageDetails isFirstTimeBuyer={isFirstTimeBuyer} />
        <FinancialPlanner isFirstTimeBuyer={isFirstTimeBuyer} />

        <a class="pb-3" target="_blank" rel="noopener noreferrer" href='https://pngtree.com/freepng/house-home-puppy-hand-drawing_4088450.html'>png image from pngtree.com/</a>
      </main>
    </div>
  );
}

export default App;
