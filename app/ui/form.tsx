
'use client'
import { count, error } from "console";
import { Result, ResultDaily } from "./result";
import { useState } from "react";
import { Values, DailyValues } from "@/app/lib/data";
import Button from '@mui/material/Button';
import { Box, Divider, Table, TableRow, TextField, TableBody,TableCell } from "@mui/material";
import { IsCurrency } from "@/app/lib/util";
import { MonthPlan } from "../lib/daily";

// change this file to typescript first. DONE
export function Form() {
  // DONT NEED THIS : this is only for console.log
  // const [ income, setIncome ] = useState<number | null>(null);
  // const [interest, setInterest] = useState<number | null>(null);
  // const [tax, setTax] = useState<number | null>(null);
  const [values, setValues] = useState<Values|null>(null);
  const [errorMessage, setErrorMessage] = useState('');


  function handleCurrency(e: React.ChangeEvent<HTMLInputElement>) {
    if (!IsCurrency(e.target.value)) {
      setErrorMessage('Hanya masukkan angka.');
    } else {
      setErrorMessage('');
    }

  }

  function countFinance(formData: FormData) {
    const theValues: Values = {
      income: parseInt(formData.get("income") as string),
      interest: parseFloat(formData.get("interest") as string) / 100,
      tax: parseInt(formData.get("tax") as string) / 100,
      year: parseInt(formData.get("year") as string),
      incomeMonthly: parseInt(formData.get("incomeMonthly") as string)
    }

    setValues(theValues);
  }

  return (
    <>
      <div className="p-8 min-h-screen">
        <Box
          component="form"
          action={countFinance}
          className="rounded-xl bg-white shadow-lg p-6 border border-gray-200 max-w-2xl mx-auto bg-green-100"
        >
          <Table className="w-full">
            <TableBody>
              {/* Table Row 1: Initial Savings */}
              <TableRow>
                <TableCell className="py-4">
                  <label className="text-gray-700 font-medium">Masukkan tabungan awalmu berapa:</label>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">Rp.</span>
                    <TextField
                      className="w-full"
                      title="Masukan pemasukanmu berapa"
                      name="income"
                      id="income"
                      variant="outlined"
                      size="small"
                      required
                      onChange={handleCurrency}
                      error={errorMessage ? true : false}
                      helperText={errorMessage}
                    />
                  </div>
                </TableCell>
              </TableRow>

              {/* Table Row 2: Interest Rate */}
              <TableRow>
                <TableCell className="py-4">
                  <label className="text-gray-700 font-medium">Masukkan bunga tabunganmu berapa:</label>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <TextField
                      className="w-full"
                      title="Masukkan bunga tabunganmu berapa"
                      name="interest"
                      id="interest"
                      variant="outlined"
                      size="small"
                      required
                      onChange={handleCurrency}
                      error={errorMessage ? true : false}
                      helperText={errorMessage}
                    />
                    <span className="ml-2 text-gray-600">%</span>
                  </div>
                </TableCell>
              </TableRow>

              {/* Table Row 3: Tax Rate */}
              <TableRow>
                <TableCell className="py-4">
                  <label className="text-gray-700 font-medium">Masukkan pajak bunga tabunganmu berapa:</label>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <TextField
                      className="w-full"
                      title="Masukkan pajak bunga tabunganmu berapa"
                      name="tax"
                      id="tax"
                      variant="outlined"
                      size="small"
                      required
                      onChange={handleCurrency}
                      error={errorMessage ? true : false}
                      helperText={errorMessage}
                    />
                    <span className="ml-2 text-gray-600">%</span>
                  </div>
                </TableCell>
              </TableRow>

              {/* Table Row 4: Monthly Income */}
              <TableRow>
                <TableCell className="py-4">
                  <label className="text-gray-700 font-medium">Masukkan pemasukan bulananmu berapa:</label>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                  <span className="mr-2 text-gray-600">Rp.</span>
                    <TextField
                      className="w-full"
                      title="Masukkan pemasukan bulananmu berapa"
                      name="incomeMonthly"
                      id="incomeMonthly"
                      variant="outlined"
                      size="small"
                      required
                      onChange={handleCurrency}
                      error={errorMessage ? true : false}
                      helperText={errorMessage}
                    />
                  </div>
                </TableCell>
              </TableRow>

              {/* Table Row 5: Years of Saving */}
              <TableRow>
                <TableCell className="py-4">
                  <label className="text-gray-700 font-medium">Masukkan tahun lama kamu menabung:</label>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <TextField
                      className="w-full"
                      title="Masukkan tahun lama kamu menabung"
                      name="year"
                      id="year"
                      variant="outlined"
                      size="small"
                      required
                      onChange={handleCurrency}
                      error={errorMessage ? true : false}
                      helperText={errorMessage}
                    />
                    <span className="ml-2 text-gray-600">tahun</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <Button
              variant="contained"
              type="submit"
              className="bg-green-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              sx={{bgcolor: "green"}}
            >
              Hitung
            </Button>
          </div>
        </Box>

        {/* Divider */}
        <div className="my-8">
          <Divider className="bg-gray-300" />
        </div>

        {/* Result Section */}
        <Result data={values} />
      </div>
    </>
  )
}


export function FormDaily() {
  const [values, setValues] = useState<DailyValues|null>(null)
  const [monthPlan, setMonthPlan] = useState<MonthPlan|null>(null)


  function countDaily(formData: FormData) {
    const theValues: DailyValues = {
      expenses: parseInt(formData.get("expenses") as string),
      savings: parseInt(formData.get("monthIncome") as string),
      mortgagePercent: 0.3,
      savingPercent: 0.2,
      expensePercent: 0.5
    }
    console.log(theValues)
    setValues(theValues)

    let countMonthPlan = new MonthPlan(theValues as DailyValues)
    countMonthPlan.CountBudget()
    setMonthPlan(countMonthPlan)
  }
  return (
    <>
      <div className="p-8 min-h-screen">
        <Box
          component="form"
          action={countDaily}
          className="rounded-xl bg-white shadow-lg p-6 border border-gray-200 max-w-2xl mx-auto bg-green-100"
        >
          <Table className="w-full">
            <TableBody>
              {/* 1. Insert expenses everymonth */}
              <TableRow>
                <TableCell className="py-4">
                  <label className="text-gray-700 font-medium">Masukkan pengeluaranmu per bulan berapa:</label>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">Rp.</span>
                    <TextField
                      className="w-full"
                      title="Masukan pengeluaranmu berapa"
                      name="expenses"
                      id="expenses"
                      variant="outlined"
                      size="small"
                      required
                      // TODO : refactor handleCurrency biar reusable
                      // onChange={handleCurrency}
                      // error={errorMessage ? true : false}
                      // helperText={errorMessage}
                    />
                  </div>
                </TableCell>
              </TableRow>

              {/* 2. Insert savings everymonth */}
              <TableRow>
                <TableCell className="py-4">
                  <label className="text-gray-700 font-medium">Masukkan target tabungan sebulan berapa:</label>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">Rp.</span>
                    <TextField
                      className="w-full"
                      title="Masukan pengeluaranmu berapa"
                      name="monthIncome"
                      id="monthIncome"
                      variant="outlined"
                      size="small"
                      required
                      // onChange={handleCurrency}
                      // error={errorMessage ? true : false}
                      // helperText={errorMessage}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>

          </Table>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <Button
              variant="contained"
              type="submit"
              className="bg-green-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              sx={{bgcolor: "green"}}
            >
              Hitung
            </Button>
          </div>
        </Box>

        {/* Divider */}
        <div className="my-8">
          <Divider className="bg-gray-300" />
        </div>

        {/* Result Section */}
        <ResultDaily data={monthPlan} />
      </div>

    </>
  )
}