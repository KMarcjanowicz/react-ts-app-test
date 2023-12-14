import { FaTimes } from 'react-icons/fa'

const Task = (props:ITaskProps) => {
  return (
    <div className={`task ${props.task.reminder ? 'reminder' : ''}`} onDoubleClick={() => props.toggleReminder(props.task.id)}>
        <h3>{props.task.text} <FaTimes onClick={() => props.deleteTask(props.task.id)} style={{color: 'red', cursor: 'pointer'}}/></h3>
        <p>{props.task.day}</p>
        <button></button>
    </div>
  )
}

export interface ITaskProps {
  task: TaskInterface,
  deleteTask: (id:number) => void,
  toggleReminder: (id:number) => void
}


export interface TaskInterface {
  id: number,
  text: string,
  day: string,
  reminder: boolean
};

export default Task