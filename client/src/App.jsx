import React, { useState, useEffect } from 'react';
import AuthButton from './components/AuthButton';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('google_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks([...tasks, { title }]);
    setTitle('');
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10 w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 flex items-center gap-2">
            <img
              src="https://img.icons8.com/emoji/48/task-complete-emoji.png"
              alt="icon"
              className="w-8 md:w-10"
            />
            Task Manager
          </h1>
        </div>

        {/* Auth */}
        <AuthButton setUser={setUser} />

        {/* Content */}
        {user ? (
          <>
            <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3 mt-6">
              <input
                type="text"
                className="border rounded p-2 w-full"
                placeholder="Enter a task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
              >
                Add
              </button>
            </form>

            <div className="mt-6 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300">
              {tasks.length > 0 ? (
                <ul className="space-y-3">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-indigo-50 p-3 rounded shadow-sm"
                    >
                      <span className="text-indigo-900">{task.title}</span>
                      <button
                        onClick={() => deleteTask(index)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-400">No tasks yet. Start adding some!</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 mt-6">Please login to manage tasks.</p>
        )}
      </div>
    </div>
  );
}

export default App;
