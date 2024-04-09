const calculateUSC = (grossIncome) => {
    let usc = 0;
    if (grossIncome > 13000) {
      usc += Math.min(grossIncome, 12012) * 0.005;
      if (grossIncome > 12012) {
        usc += Math.min(grossIncome - 12012, 25760 - 12012) * 0.02;
      }
      if (grossIncome > 25760) {
        usc += Math.min(grossIncome - 25760, 70044 - 25760) * 0.04;
      }
      if (grossIncome > 70044) {
        usc += (grossIncome - 70044) * 0.08;
      }
    }
    return usc;
  };
  
  const calculatePAYE = (grossIncome) => {
    const taxCredits = 3750;
    let paye = Math.min(grossIncome, 42000) * 0.20 + Math.max(grossIncome - 42000, 0) * 0.40;
    paye = Math.max(paye - taxCredits, 0); // PAYE cannot go below 0
    return paye;
  };
  
  const calculatePRSI = (grossIncome) => {
    return grossIncome * 0.04;
  };
  
  export const calculateNetIncome = (grossIncome) => {
    const usc = calculateUSC(grossIncome);
    const paye = calculatePAYE(grossIncome);
    const prsi = calculatePRSI(grossIncome);
    
    const netIncome = grossIncome - (usc + paye + prsi);
    return netIncome;
  };
  