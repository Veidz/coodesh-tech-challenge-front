import { useState } from 'react'
import api from './api/service'
import './App.css'

function App() {
  const [error, setError] = useState('')

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
        }
      })
  }

  return (
    <div className='container'>
      <form className='form'>
        <input type="file" accept='.txt' name='file' onChange={handleFileUpload} />
        {
          error && <p className='error'>{ error }</p>
        }
      </form>
    </div>
  )
}

export default App
