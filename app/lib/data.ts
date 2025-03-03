
// TODO : masukan pemasukan per bulan berapa, dan masukin element tabungan dengan bunga & tanpa bunga bedanya berapa.

class Savings {
  data: Values;
  tenure: string = 'year';
  initTotalSavings: number = 0;
  endTotalSavings: number = 0;


  constructor(data: Values) {
    this.data = data;
    this.initTotalSavings = data.income;
  }

  CountCompoundInterest() {
    let compoundInterests: CompoundInterest[] = [];

    if (this.data.year == null) {
      return compoundInterests;
    }

    this.CountCompoundInterestYear(compoundInterests, this.data, this.data.year);
    return compoundInterests;
  }

  CountCompoundInterestYear(compoundInterests: CompoundInterest[], values: Values, remainingPeriod: number) {
    let compoundInterest: CompoundInterest;
    // console.log("Remaining period : " + remainingPeriod);

    let savingsWithIncome: number;
    if (values.year == remainingPeriod) {
      savingsWithIncome = values.income
    } else {
      savingsWithIncome = values.income + (values.incomeMonthly * 12);
      this.initTotalSavings += (values.incomeMonthly * 12);
    }
    compoundInterest = {
      year: (values.year - remainingPeriod + 1),
      initBalance: savingsWithIncome,
      endBalance: Math.round(savingsWithIncome + (savingsWithIncome * values.interest * (1 - values.tax))),
    }

    compoundInterests.push(compoundInterest);
    if (remainingPeriod <= 1) {
      this.endTotalSavings = compoundInterest.endBalance;
      return;
    }

    let newValues: Values = {
      income: compoundInterest.endBalance,
      interest: values.interest,
      tax: values.tax,
      year: values.year,
      incomeMonthly: values.incomeMonthly
    }
    remainingPeriod--;
    this.CountCompoundInterestYear(compoundInterests, newValues, remainingPeriod);
  }
}

type Values = {
  income: number,
  interest: number, //harus dalam float maks 1
  tax: number, //harus dalam float maks 1
  year: number,
  incomeMonthly: number
}

type CompoundInterest = {
  year: number,
  initBalance: number,
  endBalance: number
}

type DailyValues = {
  expenses: number,
  savings: number,
  mortgagePercent: number,
  savingPercent: number,
  expensePercent: number
}

// Define the type for an expense
interface Expense {
  name: string;
  category: string;
  currency: string;
  amount: number; 
}

// UNCOMMENT THIS TO EXPORT
export type { Values, CompoundInterest, DailyValues, Expense };
export { Savings };


// UNCOMMENT THIS SCRIPT TO TEST THIS LIB
// console.log("Halo dunia");
// const values: Values = {
//   income: 10000,
//   interest: 0.05,
//   tax: 0.2,
//   year: 5,
//   incomeMonthly: 500
// }

// const saving = new Savings(values);

// console.log(saving.CountCompoundInterest());
// console.log(saving);
