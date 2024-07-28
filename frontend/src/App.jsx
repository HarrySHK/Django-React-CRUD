import { useState, useEffect } from 'react'
import './App.css'
import Table from './components/Table'
import TodoForm from './components/TodoForm'
import axios from 'axios'


function App() {

  const [todos, setTodos] = useState("")
  const [isLoading, setisLoading] = useState(true)


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/todo');
      setTodos(response.data)
      setisLoading(false)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className=' px-8 bg-slate-950 min-h-screen '>
      <nav className='pt-8' >
      <h1 className='text-5xl font-bold text-center pb-8 bg-clip-text text-transparent bg-gradient-to-tl from-sky-200 via-slate-500 to-sky-200'>TASK LIST</h1>
      </nav>
      {/* Body */}
      <TodoForm
        setTodos={setTodos}
        fetchData={fetchData}
      />
      <Table
        todos={todos}
        isLoading={isLoading}
        setTodos={setTodos} />
        </div>
  )
}

export default App