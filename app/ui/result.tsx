'use client';

import { Values, CompoundInterest, Savings } from '@/app/lib/data';
import { CompoundInterestTable } from '@/app/ui/compound_interest_table';
import { Card, CardContent, CardHeader, Grid, Grid2 } from '@mui/material';
import { MonthPlan } from '@/app/lib/daily';

export function Result(props: { data: Values }) {
  if (props.data == null) {
    return null;
  }

  const saving = new Savings(props.data);
  const compoundInterests: CompoundInterest[] = saving.CountCompoundInterest();
  console.log(saving); // For debugging

  const elementsIncome = (
    <div className="mb-4">
      <label className="text-lg font-semibold text-gray-700">
        Tabungan awal kamu adalah: <span className="font-normal">{props.data.income.toLocaleString()}</span>
      </label>
    </div>
  );

  const elementsInterest = (
    <div className="mb-4">
      <label className="text-lg font-semibold text-gray-700">
        Bunga kamu adalah: <span className="font-normal">{props.data.interest * 100}%</span>
      </label>
    </div>
  );

  const elementsTax = (
    <div className="mb-4">
      <label className="text-lg font-semibold text-gray-700">
        Pajak bunga kamu adalah: <span className="font-normal">{props.data.tax * 100}%</span>
      </label>
    </div>
  );

  const elementsYear = (
    <div className="mb-4">
      <label className="text-lg font-semibold text-gray-700">
        Lama kamu menabung adalah: <span className="font-normal">{props.data.year} tahun</span>
      </label>
    </div>
  );

  const elementsTable = (
    <div className="my-8">
      <CompoundInterestTable data={compoundInterests} />
    </div>
  );

  const elementsFinal = (
    <div className="my-8">
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
          <Card className="shadow-lg rounded-lg">
            <CardHeader
              title="Total tabungan TANPA BUNGA:"
              titleTypographyProps={{ variant: 'h6', className: 'font-semibold text-gray-800' }}
            />
            <CardContent className="text-2xl font-bold text-gray-900">
              Rp. {saving.initTotalSavings.toLocaleString()}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card className="shadow-lg rounded-lg">
            <CardHeader
              title="Total tabungan DENGAN BUNGA:"
              titleTypographyProps={{ variant: 'h6', className: 'font-semibold text-gray-800' }}
            />
            <CardContent className="text-2xl font-bold text-gray-900">
              Rp. {saving.endTotalSavings.toLocaleString()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );

  const elements = [];
  if (props.data.income != null) {
    elements.push(elementsIncome);
  }
  if (props.data.interest != null) {
    elements.push(elementsInterest);
  }
  if (props.data.tax != null) {
    elements.push(elementsTax);
  }
  if (props.data.year != null) {
    elements.push(elementsYear);
  }
  elements.push(elementsTable);
  elements.push(elementsFinal);

  return <div className="p-6 bg-gray-50 rounded-lg">{elements}</div>;
}

export function ResultDaily(props: { data: MonthPlan }) {
  if (props.data == null) {
    return
  }

  return(
    <>
      <Card className="shadow-lg rounded-lg">
        <CardHeader
          title="Rincian bulanan DENGAN GAJI AKTIF"
          titleTypographyProps={{ variant: 'h6', className: 'font-semibold text-gray-800 '}}
        />
        <CardContent className="text-xl text-gray-900">
          <div>
            Total income : Rp. {props.data.income.toLocaleString()}
          </div>
          <div>
            Jumlah expense : Rp. {props.data.data.expenses.toLocaleString()}
          </div>
          <div>
            Jumlah cicilan : Rp. {props.data.mortgage.toLocaleString()}
          </div>
          <div>
            Jumlah tabungan : Rp. {props.data.data.savings.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </>
  )
}