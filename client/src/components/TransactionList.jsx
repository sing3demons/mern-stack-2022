import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'

export default function TransactionList({ transaction, fetchTransaction }) {
  const rows = [...transaction]

  const remove = async (id) => {
    if (!window.confirm('Are you sure')) return

    const res = await fetch(`http://localhost:4000/transaction/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      const { message } = await res.json()
      alert(message)
      fetchTransaction()
    }
  }

  const formatDate = (date) => dayjs(date).format('DD MMM, YYYY')
  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Transaction
      </Typography>
      <TableContainer sx={{ marginBottom: 10 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" component="label">
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="warning"
                    component="label"
                    onClick={() => remove(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
