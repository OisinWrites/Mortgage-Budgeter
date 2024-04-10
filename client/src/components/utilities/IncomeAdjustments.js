export const calculateAdjustedSalaries = (initialSalary, raisesAndBonuses) => {
  if (!initialSalary || !raisesAndBonuses || raisesAndBonuses.length === 0) {
    return [];
  }
  let adjustedSalaries = [];
  let currentSalary = initialSalary;

  raisesAndBonuses.forEach((item, index) => {
    currentSalary *= (1 + item.raise / 100); // Adjust salary by raise percentage
    // Add bonus to the current salary for display purposes
    let salaryWithBonus = currentSalary + item.bonus;
    adjustedSalaries.push({
      year: index + 1,
      salary: salaryWithBonus,
      baseSalary: currentSalary,
      bonus: item.bonus,
    });
  });

  return adjustedSalaries;
};