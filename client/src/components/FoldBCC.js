import React, { useState } from 'react';

const FoldBorrowingCapacityCalculator = ({ 
    numberOfApplicants,
    effectiveMaxBorrow,
    applicantIncomes,
    hasSecondApplicant
    }) => {
        const grossIncome1 = applicantIncomes[0] || 0;
        const grossIncome2 = hasSecondApplicant ? (applicantIncomes[1] || 0) : 0;

        return (
            <div>
              <h2>Borrowing Capacity Information</h2>
              <p>Number of Applicants: {numberOfApplicants}</p>
              <p>Effective Max Borrow: {effectiveMaxBorrow}</p>
              <p>Gross Income: €{grossIncome1}</p>
              {hasSecondApplicant && (
              <p>Gross Income: €{grossIncome2}</p>
              )}
            </div>
          );
    };

    export default FoldBorrowingCapacityCalculator;