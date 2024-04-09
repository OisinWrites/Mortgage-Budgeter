import React, { useState, useEffect} from 'react';

const DepositSavingPeriod = ({ maxBorrow, isFirstTimeBuyer, hasSecondApplicant}) => {
    const [mortgageDesired, setMortgageDesired] = useState('');

    const [netIncome, setNetIncome] = useState('');
    const [monthlyExpenses, setMonthlyExpenses] = useState('');
    const [rent, setRent] = useState('');
    const [bills, setBills] = useState('');
    const [additionalExpenses, setAdditionalExpenses] = useState('');
    const [savingsGoal, setSavingsGoal] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');

    const [netIncome2, setNetIncome2] = useState('');
    const [monthlyExpenses2, setMonthlyExpenses2] = useState('');
    const [rent2, setRent2] = useState('');
    const [bills2, setBills2] = useState('');
    const [additionalExpenses2, setAdditionalExpenses2] = useState('');
    const [savingsGoal2, setSavingsGoal2] = useState('');
    const [currentSavings2, setCurrentSavings2] = useState('');

    const [housePrice, setHousePrice] = useState('');
    const [solicitorFeeType, setSolicitorFeeType] = useState('1%');
    const [solicitorFlatFee, setSolicitorFlatFee] = useState('');

    useEffect(() => {
        if (!hasSecondApplicant) {
            // Reset all second applicant-related states to null or initial state
            setNetIncome2('0');
            setMonthlyExpenses2('0');
            setRent2('0');
            setBills2('0');
            setAdditionalExpenses2('0');
            setSavingsGoal2('0');
            setCurrentSavings2('0');
        }
    }, [hasSecondApplicant]);

    const combinedNetIncome = parseFloat(netIncome) + parseFloat(netIncome2);
    const combinedMonthlyExpenses = parseFloat(monthlyExpenses) + parseFloat(monthlyExpenses2);
    const combinedBills = parseFloat(bills) + parseFloat(bills2);
    const combinedAnnualExpenses = (parseFloat(additionalExpenses) || 0) + (parseFloat(additionalExpenses2) || 0);
    const combinedSavingsGoal = parseFloat(savingsGoal) + parseFloat(savingsGoal2);
    const combinedCurrentSavings = parseFloat(currentSavings) + parseFloat(currentSavings2);



    // Calculate the minimum deposit required
    const minimumDeposit = isFirstTimeBuyer ? mortgageDesired * 0.1 : mortgageDesired * 0.2;

    // Handler to cap the mortgage desired based on max borrow capacity
    const handleMortgageChange = (e) => {
        const value = Number(e.target.value);
        setMortgageDesired(value > maxBorrow ? maxBorrow : value);
    };

    function calculateRegistryFee(housePrice) {
        if (housePrice <= 50000) return 400;
        if (housePrice <= 200000) return 600;
        if (housePrice <= 400000) return 700;
        return 800; // For house prices greater than 400,000
    }
    
    function calculatePropertyTax(housePrice) {
        if (housePrice <= 200000) return 90;
        if (housePrice <= 262500) return 225;
        if (housePrice <= 350000) return 315;
        if (housePrice <= 437500) return 405;
        if (housePrice <= 525000) return 495;
        if (housePrice <= 612500) return 585;
        if (housePrice <= 700000) return 675;
        if (housePrice <= 787500) return 765;
        if (housePrice <= 875000) return 855;
        if (housePrice <= 962500) return 945;
        if (housePrice <= 1050000) return 1035;
        // Add further brackets as needed
        // Assuming the pattern continues, adjust for higher values
    }

    const calculateSolicitorFees = () => {
        if (solicitorFeeType === 'flat') {
          return Number(solicitorFlatFee); // Use the flat fee entered by the user
        } else {
          const percentage = solicitorFeeType === '1%' ? 0.01 : 0.015; // Determine the percentage
          return housePrice * percentage * 1.23; // Calculate the fee based on percentage, plus 23% VAT
        }
    };

    // Calculate additional costs
    const stampDuty = housePrice < 1000000 ? housePrice * 0.01 : housePrice * 0.02;
    const solicitorFees = calculateSolicitorFees();
    const valuerReport = 150;
    const surveyorReport = 300 * 1.23;
    const insuranceCosts = 300 + 360; // Homeowners plus mortgage insurance
    const registryFee = calculateRegistryFee(housePrice);
    const propertyTax = calculatePropertyTax(housePrice);
    const totalAdditionalCosts = stampDuty + solicitorFees + valuerReport + surveyorReport + insuranceCosts + registryFee + propertyTax;

    // Assuming functions calculateRegistryFee and calculatePropertyTax are implemented to determine the fees based on the given scales

    // Total savings needed
    const totalSavingsNeeded = minimumDeposit + totalAdditionalCosts + Number(combinedSavingsGoal);
    const monthsToSave = Math.ceil((totalSavingsNeeded - combinedCurrentSavings) / (combinedNetIncome - combinedMonthlyExpenses - combinedBills -  (combinedAnnualExpenses / 12)));

    return (
        <div class="inner-section">
            <h2>Deposit Saving Period</h2>
            <form>
                <h5>First Applicant</h5>
                <div class="split-middle">
                    <div>
                        <label>Net Pay Per Month: </label>
                        <input type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)} placeholder="Net Income"/>
                    </div>
                    <div>
                        <label>Groceries & Social: </label>
                        <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} placeholder="Monthly Expenses"/>
                    </div>
                    <div>
                        <label>Rent Per Month: </label>
                        <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="Rent (Optional)"/>
                    </div>
                    <div>
                        <label>Bills Per Month: </label>
                        <input type="number" value={bills} onChange={(e) => setBills(e.target.value)} placeholder="Bills"/>
                    </div>
                    <div>
                        <label>Annual Expenses: </label>
                        <input type="number" value={additionalExpenses} onChange={(e) => setAdditionalExpenses(e.target.value)} placeholder="(Optional)"/>
                    </div>
                    <div>
                        <label>Current Savings: </label>
                        <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="Current Savings"/>
                    </div>
                    <div>
                        <label>Savings Goal: </label>
                        <input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(e.target.value)} placeholder="Savings Goal"/>
                    </div>
                </div>

                {hasSecondApplicant && (
                    <div class="split-middle">
                        <h5>Second Applicant</h5>
                        <div>
                            <label>Net Pay Per Month: </label>
                            <input type="number" value={netIncome2} onChange={(e) => setNetIncome2(e.target.value)} placeholder="Net Income"/>
                        </div>
                        <div>
                            <label>Groceries & Social: </label>
                            <input type="number" value={monthlyExpenses2} onChange={(e) => setMonthlyExpenses2(e.target.value)} placeholder="Monthly Expenses"/>
                        </div>
                        <div>
                            <label>Rent Per Month: </label>
                            <input type="number" value={rent2} onChange={(e) => setRent2(e.target.value)} placeholder="Rent (Optional)"/>
                        </div>
                        <div>
                            <label>Bills Per Month: </label>
                            <input type="number" value={bills2} onChange={(e) => setBills2(e.target.value)} placeholder="Bills"/>
                        </div>
                        <div>
                            <label>Annual Expenses: </label>
                            <input type="number" value={additionalExpenses2} onChange={(e) => setAdditionalExpenses2(e.target.value)} placeholder="(Optional)"/>
                        </div>
                        <div>
                            <label>Current Savings: </label>
                            <input type="number" value={currentSavings2} onChange={(e) => setCurrentSavings2(e.target.value)} placeholder="Current Savings"/>
                        </div>
                        <div>
                            <label>Savings Goal: </label>
                            <input type="number" value={savingsGoal2} onChange={(e) => setSavingsGoal2(e.target.value)} placeholder="Savings Goal"/>
                        </div>
                    </div>
                )}
                <h5>Mortgage Target</h5>
                <div class="split-middle">
                    <div>
                        <label>Mortgage Amount</label>
                        <input
                            type="number"
                            value={mortgageDesired}
                            onChange={handleMortgageChange}
                            onBlur={() => setMortgageDesired(mortgageDesired > maxBorrow ? maxBorrow : mortgageDesired)}
                            placeholder="Mortgage Amount"
                        />
                    </div>
                    <div>
                        <label>
                        Limit: (up to €{maxBorrow.toFixed(2)}): 
                        </label>
                    </div>
                    <div>
                        <label>Estimated House Price: </label>
                        <input type="number" value={housePrice} onChange={(e) => setHousePrice(e.target.value)} placeholder="House Price"/>
                    </div>
                </div>

                <h5>Additional Costs</h5>
                <div class="additional-fees">
                    <p>Minimum Deposit Required: €{minimumDeposit.toFixed(2)}</p>
                    <p>Stamp Duty @{housePrice < 1000000 ? "1%" : "2%"} of the property value: €{stampDuty.toFixed(2)}</p>
                    <p>                   
                        Solicitor Fees @ 
                        <label></label>
                        <select value={solicitorFeeType} onChange={e => setSolicitorFeeType(e.target.value)}>
                            <option value="1%">1%</option>
                            <option value="1.5%">1.5%</option>
                            <option value="flat">Flat Fee</option>
                        </select>
                        {solicitorFeeType === 'flat' && (
                            <input
                            type="number"
                            value={solicitorFlatFee}
                            onChange={e => setSolicitorFlatFee(e.target.value)}
                            placeholder="Enter flat fee amount"
                            />
                        )} : €{solicitorFees.toFixed(2)}
                    </p>
                    <p>Valuer's Report Fee: €{valuerReport.toFixed(2)}</p>
                    <p>Surveyor's Report Fee (plus 23% VAT): €{surveyorReport.toFixed(2)}</p>
                    <p>Homeowner's Insurance (annual): €{(300).toFixed(2)}</p>
                    <p>Mortgage Insurance (annual): €{(360).toFixed(2)}</p>
                    <p>Registry Fee: €{registryFee.toFixed(2)}</p>
                    <p>
                        Local Property Tax: €{propertyTax.toFixed(2)}
                        <br></br>
                        <a class="bcc m-0 pb-1" href="https://www.revenue.ie/en/search.aspx?q=lpt%20calculator" target="_blank" rel="noopener noreferrer">
                            (LPT is affected by the local authority rate.<br></br>
                            Find an accurate calculation here at Revenue.ie)
                        </a>
                    </p>
                    <p class="pt-2">Total Additional Costs: €{totalAdditionalCosts.toFixed(2)}</p>
                </div>
                <div class="p-3">
                    <h6 class="font-weight-bold">Total Savings Needed: €{isNaN(totalSavingsNeeded) ? 0 : totalSavingsNeeded.toFixed(2)}</h6>
                    <h6><strong>Months to Reach Goal: {monthsToSave <= 0 ? "Goal not achievable with current setup" : monthsToSave || "-"}</strong></h6>
                </div>
            </form>
        </div>
    );
};

export default DepositSavingPeriod;
