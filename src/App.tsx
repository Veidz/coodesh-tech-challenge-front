import { useState } from 'react'
import { Transaction } from './contracts/transaction'
import api from './api/service'
import './App.css'

function App() {
  const [error, setError] = useState('')
  const [transactions, setTransactions] = useState([])
  const [totalProdutor, setTotalProdutor] = useState(0)
  const [totalAfiliado, setTotalAfiliado] = useState(0)

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("filesInput", file);
    api
      .post("https://localhost:7192/Transaction", formData, {
        headers: { "Content-Type": "multipart/form-data"}
      })
      .then(() => setError(''))
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.errors[0])
          setTransactions([])
        }
      })
  }

  const getData = async () => {
    setTransactions([])
    setError('')
    api
      .get("https://localhost:7192/Transaction")
      .then((response) => setTransactions(response.data.data))
      .catch((error) => console.error(error))
  }

  return (
    <div className='container'>
        <div className='header'>
            <form className='form'>
                <input type="file" accept='.txt' name='file' onChange={handleFileUpload} />
                {
                    error && <p className='error'>{ error }</p>
                }
            </form>

            <div>
                <button onClick={() => getData()}>Get Data</button>
            </div>
        </div>

        <div className='list-container-left'>
            <div><h1>Produtor</h1></div>
            {
                transactions.map((transaction: Transaction) => (
                    transaction.type == 'Venda produtor'
                    && (
                        <div key={transaction.id}>
                            <div className='transaction'>
                            <h1>Id: {transaction.id}</h1>
                            <p>Type: {transaction.type}</p>
                            <p>Product: {transaction.product}</p>
                            <p>Price: R${transaction.price}</p>
                            <p>Seller: {transaction.seller}</p>
                            </div>
                        </div>
                    )
                ))
            }
            <h1>Total: R${totalProdutor}</h1>
        </div>

        <div className='list-container-left'>
            <div><h1>Afiliado</h1></div>
            {
                transactions.map((transaction: Transaction) => (
                    transaction.type == 'Venda afiliado'
                    && (
                        <div key={transaction.id}>
                            <div className='transaction'>
                            <h1>Id: {transaction.id}</h1>
                            <p>Type: {transaction.type}</p>
                            <p>Product: {transaction.product}</p>
                            <p>Price: R${transaction.price}</p>
                            <p>Seller: {transaction.seller}</p>
                            </div>
                        </div>
                    )
                ))
            }
            <h1>Total: R${totalAfiliado}</h1>
        </div>
    </div>
  )
}

export default App
