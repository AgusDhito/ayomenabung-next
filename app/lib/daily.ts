import { DailyValues } from "@/app/lib/data";

class MonthPlan {
  data: DailyValues;
  income: number = 0;
  mortgage: number = 0;

  constructor(data: DailyValues) {
    this.data = data
  }

  CountBudget() {
    let baseNumber = (this.data.expenses + this.data.savings) / (this.data.savingPercent + this.data.expensePercent)
    this.mortgage = this.data.mortgagePercent * baseNumber
    this.income = (this.data.expenses + this.data.savings) + this.mortgage
  }
}

// UNCOMMENT THIS TO RUN APPLICATION
export { MonthPlan }