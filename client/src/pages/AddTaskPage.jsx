import React, { useState } from 'react';

const TaskPage = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  if (!user) return <p className="text-center mt-10">Please login first.</p>;

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks([...tasks, { title }]);
    setTitle('');
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Hello, {user.name}</h2>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <li key={idx} className="bg-gray-100 p-3 rounded shadow flex justify-between">
            <span>{task.title}</span>
            <button onClick={() => deleteTask(idx)} className="text-red-500 hover:underline">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
