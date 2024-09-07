

import { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Navbar from './components/NavBar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    setTodo(todoToEdit.todo);
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS();
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
      saveToLS();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] w-1/2'>
        <h1 className='font-bold text-center text-xl'>iTask - Manage your Todos at one place</h1>
        <div className='addtodo my-5 flex flex-col gap-4'>
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type='text'
            className='w-full rounded-lg px-5 py-2'
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className='bg-violet-800 disabled:bg-violet-600 hover:bg-violet-950 font-bold text-white p-3 py-1 rounded-md'
          >
            Save
          </button>
        </div>
        <input
          className="my-4"
          onChange={toggleFinished}
          type='checkbox'
          checked={showFinished}
        />
        Show Finished
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className='todos'>
          {todos.length === 0 && <div className='m-5'>No Todos to Display!!!</div>}
          {todos
            .filter(item => showFinished || !item.isCompleted)
            .map(item => (
              <div key={item.id} className='todo flex w-1/2 justify-between my-3'>
                <div className='flex gap-5'>
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type='checkbox'
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className='buttons flex h-full'>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='bg-violet-800 hover:bg-violet-950 font-bold text-white p-3 py-1 mx-2 rounded-md'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='bg-violet-800 hover:bg-violet-950 font-bold text-white p-3 py-1 mx-2 rounded-md'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='watermark text-end p-5 m-5'>
        Made by Druva...
      </div>
    </>
  );
}

export default App;
