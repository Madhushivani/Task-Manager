import React, { useEffect, useState, useContext } from 'react';
import { fetchTasks, deleteTask, updateTask } from '../api/api';
import { SocketContext } from '../contexts/SocketContext';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const socket = useContext(SocketContext);

    const loadTasks = async () => {
        const res = await fetchTasks();
        setTasks(res.data);
    };

    useEffect(() => {
        loadTasks();
        socket.on('taskUpdated', loadTasks);
        return () => socket.off('taskUpdated', loadTasks);
    }, [socket]);

    const handleDelete = async (id) => {
        await deleteTask(id);
    };

    const toggleComplete = async (task) => {
        await updateTask(task._id, { completed: !task.completed });
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task._id}>
                    <span
                        style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => toggleComplete(task)}
                    >
                        {task.title}
                    </span>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default TaskList;
