import logo from './logo.svg';
import './App.css';
import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';
import MortgageDetails from './components/MortgageDetails';
import FinancialPlanner from './components/FinancialPlanner';



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
