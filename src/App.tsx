import React, { useEffect } from 'react';
import { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import { TaskInterface } from './components/Task';
import AddTask from './components/AddTask';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


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

  const fetchTask = async (id:number):Promise<TaskInterface> => {
    return fetch(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() as unknown as TaskInterface
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
  const toggleReminder = async (id:number):Promise<void> => {
    const taskToToggle:TaskInterface = await fetchTask(id);
    const updatedTask:TaskInterface = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res:Response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updatedTask)
    });

    const data:TaskInterface = await res.json() as TaskInterface;

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  //{...tasks} to avoid type issues

  return (
    <Router>
      <div className="container">
        <Header message='Task Tracker' color='black' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Routes>
          <Route path='/' element={
            <>
              {showAddTask && <AddTask addTask={addTask}/>}
              {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder}/> : <p>No tasks to display.</p>}
            </>
          }>   
          </Route>
          <Route path='/about' element={<About/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
