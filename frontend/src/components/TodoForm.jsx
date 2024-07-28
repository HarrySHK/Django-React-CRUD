import React, { useEffect, useState } from 'react'
import axios from 'axios'


const TodoForm = ({ setTodos, fetchData }) => {

    const [newTodo, setNewTodo] = useState({
        'body': ''
    })

    const handleChange = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'body': e.target.value
        }))
    }

    const postTodo = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/todo/`, newTodo)
            setNewTodo({ 'body': '' })
            setTodos(prevTodos => [...prevTodos, newTodo])
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         postTodo();
    //     }
    // }


    return (
        <>
        <div className='flex flex-col items-center mb-8'>
            <input type="text" placeholder="Add Task" value={newTodo.body}
                className="input text-white border-4 border-sky-200 focus:border-4 focus:border-slate-500 focus:shadow-sky-200 focus:shadow-lg rounded-3xl bg-transparent w-full max-w-xs"
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        postTodo();
                    }
                }} />
            <button onClick={postTodo} className="btn bg-sky-200 mt-6 rounded-3xl border-none shadow-slate-500 shadow-2xl font-bold hover:backdrop-blur-xl hover:bg-transparent hover:text-sky-200">Add task</button>
            </div>
        </>
    )
}

export default TodoForm