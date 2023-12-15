import React from 'react';
import { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks';
import { TaskInterface } from './components/Task';
import AddTask from './components/AddTask';

function App() {

  const [tasks, setTasks] = useState<TaskInterface[]>(
    [
        {
            id: 1,
            text: "Doctor's Appointment",
            day: "Feb 5th 6:30PM",
            reminder: true
        },
        {
            id: 2,
            text: "Meeting at school",
            day: "Feb 6th 1:30PM",
            reminder: true
        },
        {
            id: 3,
            text: "Food shopping",
            day: "Feb 7th 2:30PM",
            reminder: false
        }
    ]
  );

  //Delete tasks
  const deleteTask = (id:number):void => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = (id:number):void => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  //{...tasks} to avoid type issues

  return (
    <div className="container">
      <Header message='Hello Konrad!' color='green'></Header>
      <AddTask />
      {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder}/> : <p>No tasks to display.</p>}
    </div>
  );
}

export default App;
