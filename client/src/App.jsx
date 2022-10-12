import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import ButtonAppBar from './components/AppBar.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionList from './components/TransactionList.jsx'

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: '',
    date: '',
  })
  const [transaction, setTransaction] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:4000/transaction', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      fetchTransaction()
    }
  }

  const handleInput = (e) => {
    console.log(e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const fetchTransaction = async () => {
    const controller = new AbortController()
    const signal = controller.signal
    const res = await fetch('http://localhost:4000/transaction', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal,
    })

    const { data } = await res.json()
    setTransaction(data)
  }

  useEffect(() => {
    fetchTransaction()
  }, [])

  return (
    <>
      <ButtonAppBar />
      <Container>
        <TransactionForm fetchTransaction={fetchTransaction} />
        <TransactionList transaction={transaction} />
      </Container>
    </>
  )
}

export default App
