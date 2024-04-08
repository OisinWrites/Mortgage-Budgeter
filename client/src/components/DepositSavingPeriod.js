import React, { useState } from 'react';

const DepositSavingPeriod = ({ maxBorrow, isFirstTimeBuyer }) => {
    const [mortgageDesired, setMortgageDesired] = useState('');
    const [rent, setRent] = useState('');
    const [bills, setBills] = useState('');
    const [netIncome, setNetIncome] = useState('');
    const [monthlyExpenses, setMonthlyExpenses] = useState('');
    const [additionalExpenses, setAdditionalExpenses] = useState('');
    const [savingsGoal, setSavingsGoal] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [housePrice, setHousePrice] = useState('');

    // Calculate the minimum deposit required
    const minimumDeposit = isFirstTimeBuyer ? mortgageDesired * 0.1 : mortgageDesired * 0.2;

    // Handler to cap the mortgage desired based on max borrow capacity
    const handleMortgageChange = (e) => {
        const value = Number(e.target.value);
        setMortgageDesired(value > maxBorrow ? maxBorrow : value);
    };

    // Calculate additional costs
    const stampDuty = housePrice < 1000000 ? housePrice * 0.01 : housePrice * 0.02;
    const solicitorFees = (housePrice * 0.01) * 1.23; // Assuming 1% fee plus 23% VAT
    const valuerReport = 150;
    const surveyorReport = 300 * 1.23;
    const insuranceCosts = 300 + 360; // Homeowners plus mortgage insurance
    const registryFee = calculateRegistryFee(housePrice);
    const propertyTax = calculatePropertyTax(housePrice);
    const totalAdditionalCosts = stampDuty + solicitorFees + valuerReport + surveyorReport + insuranceCosts + registryFee + propertyTax;

    // Assuming functions calculateRegistryFee and calculatePropertyTax are implemented to determine the fees based on the given scales

    // Total savings needed
    const totalSavingsNeeded = minimumDeposit + totalAdditionalCosts + Number(savingsGoal);
    const monthsToSave = Math.ceil((totalSavingsNeeded - currentSavings) / (netIncome - monthlyExpenses - bills - (additionalExpenses || 0)));

    return (
        <div>
            <h2>Deposit Saving Period</h2>
            <form>
                <label>Mortgage Desired:</label>
                <input type="number" value={mortgageDesired} onChange={handleMortgageChange} max={maxBorrow} placeholder="Mortgage Desired"/>
                <p>Minimum Deposit Required: €{minimumDeposit.toFixed(2)}</p>
                
                <label>Rent Per Month (€):</label>
                <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="Rent"/>
                
                <label>Bills Per Month (€):</label>
                <input type="number" value={bills} onChange={(e) => setBills(e.target.value)} placeholder="Bills"/>
                
                <label>Net Income Per Month (€):</label>
                <input type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)} placeholder="Net Income"/>
                
                <label>Monthly Expenses Budget (€):</label>
                <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} placeholder="Monthly Expenses"/>
                
                <label>Additional Expenses (€):</label>
                <input type="number" value={additionalExpenses} onChange={(e) => setAdditionalExpenses(e.target.value)} placeholder="Additional Expenses"/>
                
                <label>Savings Goal (€):</label>
                <input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(e.target.value)} placeholder="Savings Goal"/>
                
                <label>Current Savings (€):</label>
                <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="Current Savings"/>
                
                <label>Estimated House Price (€):</label>
                <input type="number" value={housePrice} onChange={(e) => setHousePrice(e.target.value)} placeholder="House Price"/>

                <p>Total Additional Costs: €{totalAdditionalCosts.toFixed(2)}</p>
                <p>Total Savings Needed: €{totalSavingsNeeded.toFixed(2)}</p>
                <p>Months to Reach Goal: {monthsToSave < 0 ? "Not achievable with current setup" : monthsToSave}</p>
            </form>
        </div>
    );
};

export default DepositSavingPeriod;
