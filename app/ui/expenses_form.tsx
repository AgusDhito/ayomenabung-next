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

// Define the type for an expense
interface Expense {
  name: string;
  category: string;
  currency: string;
  amount: number;
  
}

function ExpensesForm() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expense, setExpense] = useState<Expense>({ name: "", category: "Housing", currency: "IDR", amount: 0 })

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
        console.log(formData.get("name") as string)
        const newExpense: Expense = {
            name: formData.get("name") as string,
            category: formData.get("category") as string,
            currency: formData.get("currency") as string,
            amount: parseInt(formData.get("amount") as string)
        }

        setExpenses((prevExpenses) => [...prevExpenses, newExpense])
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
        
        </>
    )
};

export default ExpensesForm;