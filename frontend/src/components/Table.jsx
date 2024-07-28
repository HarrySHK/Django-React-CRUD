import axios from 'axios'
import React, { useState } from 'react'
import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'


const Table = ({ todos, isLoading, setTodos }) => {

  const [editText, setEditText] = useState({
    'body': ''
  })

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
      const newList = todos.filter(todo => todo.id !== id)
      setTodos(newList)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
      console.log(response.data);
      const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
      setTodos(newTodos)
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setEditText(prev => ({
      ...prev,
      'body': e.target.value
    }))
    console.log(editText);
  }

  const handleClick = () => {
    handleEdit(editText.id, editText)
    setEditText({
      'body': ""
    })
  }

  const handleCheckbox = (id, value) => {
    console.log(value.completed);
    handleEdit(id, {
      'completed': !value
    })
  }


  return (
    <div className='overflow-x-scroll'>
      <table className='w-11/12 max-w-4xl text-white'>
        <thead className='border-b-2 border-slate-700 text-sky-200'>
          <tr>
            <th className='p-3 text-md font-bold tracking-wide text-left'>Checkbox</th>
            <th className='p-3 text-md font-bold tracking-wide text-left'>Tasks</th>
            <th className='p-3 text-md font-bold tracking-wide text-left'>Status</th>
            <th className='p-3 text-md font-bold tracking-wide text-left'>Date Created</th>
            <th className='p-3 text-md font-bold tracking-wide text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? <div>Is Loading </div> :
            <> {todos.map((todoItem, index) =>
            (
              <tr key={todoItem.id} className='border-b-2 border-slate-700'>
                <td className='p-3'>
                  <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
                    className='inline-block cursor-pointer text-2xl'>{todoItem.completed === true ? <MdOutlineCheckBox /> :
                      <MdOutlineCheckBoxOutlineBlank />}
                  </span>
                </td>
                <td className='p-3 text-sm' title={todoItem.id}>{todoItem.body}</td>
                <td className='p-3 text-sm text-center'>
                  <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? 'bg-green-300' : 'bg-red-300'}`}>
                    {todoItem.completed ? 'Done' : 'Incomplete'}
                  </span>
                </td>
                <td className='p-3 text-sm font-medium'>{new Date(todoItem.created).toLocaleString()}</td>
                <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5 '>
                  <span className=' text-4xl cursor-pointer'><label htmlFor="my-modal" ><MdEditNote onClick={() => setEditText(todoItem)} /></label></span>
                  <span className=' text-4xl cursor-pointer'><MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} /></span>

                </td>
              </tr>
            )
            )}</>}
        </tbody>
      </table>

      {/* Modal */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal text-white">
        <div className="modal-box backdrop-blur-md bg-transparent shadow-slate-500 shadow-2xl">
          <h3 className="font-bold text-lg">Edit Task</h3>
          <input type="text" value={editText.body} onChange={handleChange} placeholder="Type here" className="input bg-transparent rounded-3xl text-white border-4 border-sky-200 focus:border-slate-500 w-full mt-8" />
          <div className="modal-action">
            <label htmlFor="my-modal" onClick={handleClick} className="btn rounded-3xl bg-transparent border-2 border-slate-500 text-green-500 font-bold hover:bg-slate-950">Edit</label>
            <label htmlFor="my-modal" className="btn rounded-3xl bg-transparent border-2 border-slate-500 text-red-500 font-bold hover:bg-slate-950">Close</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table