import logo from './logo.svg';
import './App.css';
import BorrowingCapacityCalculator from './BorrowingCapacityCalculator';
import MortgageDetails from './MortgageDetails';
import FinancialPlanner from './FinancialPlanner';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mortgage and Savings Calculator</h1>
      </header>
      <main>
        <BorrowingCapacityCalculator />
        <MortgageDetails/>
        <FinancialPlanner/>.
      </main>
    </div>
  );
}

export default App;
