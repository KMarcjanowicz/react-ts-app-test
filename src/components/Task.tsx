import { FaTimes } from 'react-icons/fa'

const Task = (props:ITaskProps) => {
  return (
    <div className='task'>
        <h3>{props.task.text} <FaTimes onClick={() => props.deleteTask ? props.deleteTask(props.task.id) : ''} style={{color: 'red', cursor: 'pointer'}}/></h3>
        <p>{props.task.day}</p>
    </div>
  )
}

export interface ITaskProps {
  task: TaskInterface,
  deleteTask?: (id:number) => void
}


export interface TaskInterface {
  id: number,
  text: string,
  day: string,
  remeinder: boolean
};

export default Task