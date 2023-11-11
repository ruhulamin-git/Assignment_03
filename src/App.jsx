import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON Placeholder API
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleCompleteToggle = (id, completed) => {
    if (completed) {
      toast.warning('Your Task is Already Done', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  return (
    <div className='my-5 mx-20 px-20 py-5 '>
      <table className="table-fixed justify-center items-center border-solid border-orange-400">
        <thead>
          <tr className='justify-center items-center'>
            <th className="border-solid border-orange-400 w-1/4 px-4 py-2">Action</th>
            <th className="border-solid border-orange-400 w-1/4 px-4 py-2">UserID/Name</th>
            <th className="border-solid border-orange-400 w-1/4 px-4 py-2">Title</th>
            <th className="border-solid border-orange-400 w-1/4 px-4 py-2">Complete Status</th>
          </tr>
        </thead>
        <tbody className='text-center items-center'>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="border-solid border-orange-400 xl:pl-24 lg:pl-24 md:pl-8">
                <span
                  className={`checkmark ${todo.completed ? 'green' : 'black'}`}
                  onClick={() => handleCompleteToggle(todo.id, todo.completed)}
                >
                  <Icon icon="material-symbols:check" className="checkmark-icon" />
                </span>
              </td>
              <td className="border-solid border-orange-400 ">{todo.id}</td>
              <td className="border-solid border-orange-400 ">{todo.title}</td>
              <td className="border-solid border-orange-400 ">{todo.completed ? 'Done' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
        <ToastContainer />
      </table>
    </div>
  )
}

export default App
