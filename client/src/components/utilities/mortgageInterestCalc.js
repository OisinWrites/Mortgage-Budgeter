export const calculateMonthlyMortgagePayment = (principal, annualInterestRate, termYears) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const loanTermMonths = termYears * 12;
    const monthlyPayment = principal * 
      (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths)));
    return monthlyPayment;
  };
  
  export const generateRepaymentSchedule = (principal, annualInterestRate, termYears) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const loanTermMonths = termYears * 12;
    const monthlyPayment = calculateMonthlyMortgagePayment(principal, annualInterestRate, termYears);
  
    let repaymentSchedule = [];
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
  
      repaymentSchedule.push({
        year,
        openingBalance: remainingBalance + capitalRepayment, // Adjusted for the loop's decrement
        annualInterestCharged,
        capitalRepayment,
      });
    }
  
    return repaymentSchedule;
  };
  