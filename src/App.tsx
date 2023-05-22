import { useEffect, useState } from 'react'
import { Transaction } from './contracts/transaction'
import api from './api/service'
import './App.css'

function App() {
  const [error, setError] = useState('')
  const [transactions, setTransactions] = useState([])
  const [totalProducer, setTotalProdutor] = useState(0)
  const [totalAffiliated, setTotalAffiliated] = useState(0)

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

  useEffect(() => {
    let totalProdutorAux = 0
    let totalAfiliadoAux = 0

    transactions.map((transaction: Transaction) => {
        if (transaction.type == 'Venda produtor') {
            totalProdutorAux += transaction.price
            setTotalProdutor(totalProdutorAux += transaction.price)
        }
        else if (transaction.type == 'Venda afiliado') {
            totalAfiliadoAux += transaction.price
            setTotalAffiliated(totalAfiliadoAux += transaction.price)
        }
    })
  }, [transactions])

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

        <div>
            <h1 style={{ marginTop: '100px', fontSize: '24px' }}>Producer</h1>
            <div className='list-container-left'>
                {
                    transactions.map((transaction: Transaction) => (
                        transaction.type == 'Venda produtor'
                        && (
                            <div key={transaction.id}>
                                <div className='transaction'>
                                <h1>Id: {transaction.id}</h1>
                                <p>Type: {transaction.type}</p>
                                <p>Product: {transaction.product}</p>
                                <p>Seller: {transaction.seller}</p>
                                <p>Price: R${transaction.price}</p>
                                </div>
                            </div>
                        )
                    ))
                }
            </div>
            <div><h1 style={{ fontSize: '24px' }}>Total: R${totalProducer}</h1></div>
        </div>

        <div>
            <div><h1 style={{ marginTop: '100px', fontSize: '24px' }}>Affiliated</h1></div>
            <div className='list-container-left'>
                {
                    transactions.map((transaction: Transaction) => (
                        transaction.type == 'Venda afiliado'
                        && (
                            <div key={transaction.id}>
                                <div className='transaction'>
                                <h1>Id: {transaction.id}</h1>
                                <p>Type: {transaction.type}</p>
                                <p>Product: {transaction.product}</p>
                                <p>Seller: {transaction.seller}</p>
                                <p>Price: R${transaction.price}</p>
                                </div>
                            </div>
                        )
                    ))
                }
            </div>
            <div><h1 style={{ fontSize: '24px' }}>Total: R${totalAffiliated}</h1></div>
        </div>
    </div>
  )
}

export default App
