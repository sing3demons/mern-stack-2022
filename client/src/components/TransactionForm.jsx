import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '@mui/material/Button'

const initialForm = {
  amount: 0,
  description: '',
  date: new Date(),
}
export default function TransactionForm({ fetchTransaction }) {
  const [form, setForm] = useState(initialForm)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:4000/transaction', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      fetchTransaction()
      setForm(initialForm)
    }
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Add New Transaction</Typography>
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={form.amount}
            name="amount"
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={form.description}
            name="description"
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              onChange={handleDate}
              value={form.date}
              name="date"
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
