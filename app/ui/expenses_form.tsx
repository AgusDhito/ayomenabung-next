'use client'

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  TableContainer,
  Paper,
  TableHead,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Expense } from "@/app/lib/data";
import { BalanceForecast, ForecastRecord } from "@/app/lib/balance_forecast";

function ExpensesForm() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expense, setExpense] = useState<Expense>({ name: "", category: "Housing", currency: "IDR", amount: 0 })
    const [expenseForecasts, setExpenseForecasts] = useState<Map<Expense, ForecastRecord[]>>(new Map<Expense, ForecastRecord[]>())
    const [year, setYear] = useState<number>(0)

    function handleSelectChange(e: SelectChangeEvent) {
        const { name, value } = e.target

        setExpense((prevExpense) => (
            {
                ...prevExpense,
                [name]: value,
            }
        ))
    }
    function addExpense(formData: FormData) {
        const newExpense: Expense = {
            name: formData.get("name") as string,
            category: formData.get("category") as string,
            currency: formData.get("currency") as string,
            amount: parseInt(formData.get("amount") as string)
        }

        setExpenses((prevExpenses) => [...prevExpenses, newExpense])
    }

    function reforecastBalance(e: React.ChangeEvent<HTMLInputElement>) {
        let year = parseInt(e.target.value)
        setYear(year)
        const forecasts = new BalanceForecast(expenses)
        setExpenseForecasts(forecasts.Forecast(year) as Map<Expense, ForecastRecord[]>)   
    }
    return (
        <>
        <Box
            component="form"
            action={addExpense}
        >

            <TableContainer component={Paper}>
                <Table className="min-w-full">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Currency</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <label className="text-gray-700 font-medium">Masukkan tahun :</label>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    className="w-full" 
                                    name="year" 
                                    id="year" 
                                    // required 
                                    onChange={reforecastBalance}
                                >
                                </TextField>
                            </TableCell>
                        </TableRow>

                        {expenses.map((expense, index) => (
                            <TableRow key={index}>
                                <TableCell className="py-4 text-gray-700">{expense.name}</TableCell>
                                <TableCell className="py-4 text-gray-700">{expense.category}</TableCell>
                                <TableCell className="py-4 text-gray-700">{expense.currency}</TableCell>
                                <TableCell className="py-4 text-gray-700">{expense.amount}</TableCell>
                                <TableCell />
                            </TableRow>
                        ))}

                            <TableRow key="new_expense">
                                <TableCell>
                                    <TextField name="name">
                                    </TextField>
                                </TableCell>
                                <TableCell>
                                    <Select name="category" value={expense.category} onChange={handleSelectChange}>
                                        <MenuItem value="Housing"> Housing </MenuItem>
                                        <MenuItem value="Entertainment"> Entertainment </MenuItem>
                                        {/* TODO add new category */}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                <Select name="currency" value={expense.currency}>
                                        <MenuItem value="USD"> USD </MenuItem>
                                        <MenuItem value="IDR"> IDR </MenuItem>
                                        {/* TODO add new category */}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <TextField name="amount">
                                    </TextField>
                                </TableCell>
                            </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>

            <Button type="submit">
                Add expense ++
            </Button>
        </Box>

        {/* Divider */}
        <div className="my-8">
            <Divider className="bg-gray-300" />
        </div>
        
        {/* Table forecast */}
        <Table className="min-w-full">
            <TableHead>
                {/* x = tahun */}
                {/* y = kategorinya */}
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Currency</TableCell>
                    {
                        (() => {
                            const years = []
                            for (let y = 1; y <= year; y++) {
                                years.push(<TableCell>{"Year-"+y}</TableCell>)
                            }
                            return years
                        })()
                    }
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    (() => {
                        let rows = []
                        for (let [expense, forecastRecords] of expenseForecasts) {
                            rows.push(
                                <TableRow>
                                    <TableCell>{expense.name}</TableCell>
                                    <TableCell>{expense.category}</TableCell>
                                    <TableCell>{expense.currency}</TableCell>
                                    {
                                        (() => {
                                            let years = []
                                            for (let index = 0; index < forecastRecords.length; index++) {
                                                const record = forecastRecords[index];
                                                years.push(<TableCell>{record.totalAmount}</TableCell>)
                                            }
                                            return years
                                        })()
                                    }
                                </TableRow>
                            )
                        }
                        return rows
                    })()
                }
            </TableBody>
        </Table>
        </>
    )
};

export default ExpensesForm;