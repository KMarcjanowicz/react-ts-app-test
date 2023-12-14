import React from 'react'
import Task, { TaskInterface } from './Task'

const Tasks = (props:ITasksProps) => {
  return (
    <>
        {
            Object.values(props.tasks).map((task:any) => (
                <Task key={task.id} task={task} deleteTask={props.deleteTask} toggleReminder={props.toggleReminder}/>
            ))
        }
    </>
  )
}

export interface ITasksProps {
    tasks: Array<TaskInterface>,
    deleteTask: (id:number) => void,
    toggleReminder: (id:number) => void
}

export default Tasks