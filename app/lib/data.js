"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Finance = Finance;
function countCompoundInterest(values) {
    var compoundInterests = [
        countCompoundInterestYear(values, values.year)
    ];
}
function countCompoundInterestYear(values, remainingPeriod) {
    var compoundInterest;
    compoundInterest = {
        year: (values.year - remainingPeriod),
        initBalance: values.income,
        endBalance: values.income + (values.income * values.interest * (1 - values.tax)),
    };
    if (remainingPeriod < 1) {
        return compoundInterest;
    }
    var newValues = {
        income: compoundInterest.endBalance,
        interest: values.interest,
        tax: values.tax,
        year: values.year
    };
    return countCompoundInterestYear(newValues, remainingPeriod--);
}
function Finance() {
    console.log("Halo dunia");
}
