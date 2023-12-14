import React from 'react';
import { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks';
import { TaskInterface } from './components/Task';

function App() {

  const [tasks, setTasks] = useState<TaskInterface[]>(
    [
        {
            id: 1,
            text: "Doctor's Appointment",
            day: "Feb 5th 6:30PM",
            remeinder: true
        },
        {
            id: 2,
            text: "Meeting at school",
            day: "Feb 6th 1:30PM",
            remeinder: true
        },
        {
            id: 3,
            text: "Food shopping",
            day: "Feb 7th 2:30PM",
            remeinder: false
        }
    ]
  );

  //Delete tasks
  const deleteTask = (id:number):void => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //{...tasks} to avoid type issues

  return (
    <div className="container">
      <Header message='Hello Konrad!' color='green'></Header>
      {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask}/> : <p>No tasks to display.</p>}
    </div>
  );
}

export default App;
