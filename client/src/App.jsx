import { useEffect, useState } from 'react'
import ButtonAppBar from './components/AppBar.jsx'
import TransactionForm from './components/TransactionForm.jsx'

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
    <div>
      <ButtonAppBar />

      <TransactionForm fetchTransaction={fetchTransaction} />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleInput}
          placeholder="Enter transaction amount"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Enter transaction details"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInput}
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>{' '}
          <tbody>
            {transaction.map(({ _id, amount, description, date }) => {
              return (
                <tr key={_id}>
                  <td>{amount}</td>
                  <td>{description}</td>
                  <td>{date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App
