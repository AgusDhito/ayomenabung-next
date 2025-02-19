import { CompoundInterest } from "@/app/lib/data";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export function CompoundInterestTable(props: { data: CompoundInterest[] }) {
  return (
    <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
      <Table className="min-w-full">
        <TableHead className="bg-gray-200">
          <TableRow>
            <TableCell className="py-3 px-6 text-left font-semibold">Year</TableCell>
            <TableCell className="py-3 px-6 text-left font-semibold">Tabungan Awal</TableCell>
            <TableCell className="py-3 px-6 text-left font-semibold">Tabungan Akhir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(interest => rowTable(interest))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function rowTable(compoundInterest: CompoundInterest) {
  return (
    <TableRow key={compoundInterest.year} className="hover:bg-gray-100 transition-colors">
      <TableCell className="py-3 px-6 text-left">{compoundInterest.year}</TableCell>
      <TableCell className="py-3 px-6 text-left">{compoundInterest.initBalance.toLocaleString()}</TableCell>
      <TableCell className="py-3 px-6 text-left">{compoundInterest.endBalance.toLocaleString()}</TableCell>
    </TableRow>
  );
}