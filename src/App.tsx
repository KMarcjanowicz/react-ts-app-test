import React, { useEffect } from 'react';
import { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks';
import { TaskInterface } from './components/Task';
import AddTask from './components/AddTask';

function App() {

  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const getTasks = async ():Promise<void> => {
      const data:void = await fetchTasks();
      setTasks(data as unknown as TaskInterface[]);
    };
    getTasks();
  }, []);

  const fetchTasks = async ():Promise<void> => {
      return fetch('http://localhost:5000/tasks')
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json() as Promise<void>
        })
  }

  //Add taks
  const addTask = async (text:string, day:string, reminder:boolean):Promise<void> => {
    // const newId:number = Math.floor(Math.random() * 100000) + 1;
    // const newTask:TaskInterface = {id: newId, text: text, day: day, reminder: reminder}
    // setTasks([...tasks, newTask]);

    const res:Response = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({text, day, reminder})
    });

    const data:TaskInterface = await res.json() as TaskInterface;
    setTasks([...tasks, data]);
  }

  //Delete tasks
  const deleteTask = async (id:number):Promise<void> => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE'});

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = (id:number):void => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  //{...tasks} to avoid type issues

  return (
    <div className="container">
      <Header message='Hello Konrad!' color='green' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask addTask={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder}/> : <p>No tasks to display.</p>}
    </div>
  );
}

export default App;
