// mortgageInterestCalc.js

/**
 * Calculates the monthly mortgage payment.
 * @param {number} principal - The principal loan amount.
 * @param {number} annualInterestRate - The annual interest rate (as a percentage).
 * @param {number} termYears - The term of the loan in years.
 * @returns {number} The monthly payment amount.
 */
export const calculateMonthlyPayment = (principal, annualInterestRate, termYears) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const loanTermMonths = termYears * 12;
    const monthlyPayment = principal * 
      (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths)));
    return monthlyPayment;
  };
  
  /**
   * Generates a repayment schedule for each year of the mortgage term.
   * @param {number} principal - The principal loan amount.
   * @param {number} annualInterestRate - The annual interest rate (as a percentage).
   * @param {number} termYears - The term of the loan in years.
   * @returns {Array} An array of objects containing repayment information per year.
   */
  export const generateRepaymentSchedule = (principal, annualInterestRate, termYears) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const loanTermMonths = termYears * 12;
    const monthlyPayment = calculateMonthlyPayment(principal, annualInterestRate, termYears);
  
    let schedule = [];
    let remainingBalance = principal;
  
    for (let year = 1; year <= termYears; year++) {
      let annualInterestCharged = 0;
      let capitalRepayment = 0;
  
      for (let month = 1; month <= 12; month++) {
        let interestForMonth = remainingBalance * monthlyInterestRate;
        let principalRepaymentForMonth = monthlyPayment - interestForMonth;
        remainingBalance -= principalRepaymentForMonth;
  
        // Accumulate totals for the year
        annualInterestCharged += interestForMonth;
        capitalRepayment += principalRepaymentForMonth;
      }
  
      // Correct for potential negative remaining balance in the last year
      if (remainingBalance < 0) {
        capitalRepayment += remainingBalance; // Subtract since remainingBalance is negative
        remainingBalance = 0;
      }
  
      schedule.push({
        year,
        openingBalance: remainingBalance + capitalRepayment, // Adjusted for the loop's decrement
        annualInterestCharged,
        capitalRepayment,
      });
    }
  
    return schedule;
  };
  