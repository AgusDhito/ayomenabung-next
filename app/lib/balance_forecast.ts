import { Expense } from "@/app/lib/data"

interface ForecastRecord {
    tenure: string;
    totalAmount: number;
    period: number;
}

class BalanceForecast {
    formExpenses: Expense[];
    tenure: string = "year";

    constructor(formExpenses: Expense[]) {
        this.formExpenses = formExpenses
    }

    Forecast(period: number) {
        if (this.tenure != "year") {
            return
        }

        let forecastRecords = new Map<Expense, ForecastRecord[]>()
        let accumulativeExpenses = new Map<string, number>()

        for (let index = 0; index < this.formExpenses.length; index++) {
            let element = this.formExpenses[index]
            accumulativeExpenses.set(element.name, element.amount * 12)
            forecastRecords.set(element, [{tenure: this.tenure, totalAmount: element.amount * 12, period: 1}])
            
        }
        for (let year = 2; year <= period; year++) {
            for (let index = 0; index < this.formExpenses.length; index++) {
                const expense = this.formExpenses[index];

                let totalAmount = accumulativeExpenses.get(expense.name) as number + (expense.amount * 12)
                accumulativeExpenses.set(expense.name, totalAmount)
                let forecastRecord: ForecastRecord = {
                    totalAmount: totalAmount,
                    tenure: this.tenure,
                    period: year,
                }

                forecastRecords.get(expense)?.push(forecastRecord)
            }
        }

        // console.log(forecastRecords)
        return forecastRecords
    }
}


// UNCOMMENT THIS SECTION TO RUN APPLICATION
export type { ForecastRecord }
export { BalanceForecast }

// const expenses: Expense[] = [
//     {
//         name: "ASD",
//         category: "Housing",
//         currency: "IDR",
//         amount: 1000
//     }
// ]

// const forecasting = new BalanceForecast(expenses)
// console.log(forecasting.Forecast(5))