import React, { ChangeEvent, FormEvent, SetStateAction } from 'react'
import { useState } from 'react'

const AddTask = (props:IAddTask) => {

  const [text, setText] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [reminder, setReminder] = useState<boolean>(false);

  const handleChangeString = (event: ChangeEvent<HTMLInputElement>, type:string, value: | SetStateAction<string>) => {
    if(type === 'task'){
      setText(value);
    }
    else if(type === 'day'){
      setDay(value);
    }
  }

  const handleChangeBoolean = (event: ChangeEvent<HTMLInputElement>, type:string, value: | SetStateAction<boolean>) => {
    if(type === 'reminder'){
      setReminder(value);
    }
  }

  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!text){
      alert("Please add task!");
    }

    // send it to the App.ts to execute
    props.addTask(text, day, reminder);

    //default values
    setText('');
    setDay('');
    setReminder(false);
  }

  return (
    <form className='add-form' onSubmit={(e) => onSubmit(e)}>

      <div className='form-control'>
        <label>Task:</label>
        <input type='text' placeholder='Add task' value={text} onChange={(e) => handleChangeString(e, 'task', e.target.value)}/>
      </div>

      <div className='form-control'>
        <label>Day & Time:</label>
        <input type='text' placeholder='Add day & time' value={day} onChange={(e) => handleChangeString(e, 'day', e.target.value)}/>
      </div>

      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input type='checkbox' checked={reminder} onChange={(e) => handleChangeBoolean(e, 'reminder', e.target.checked)}/>
      </div>
      
      <input type='submit' value='Save Task' className='btn btn-block'/>
    </form>
  )
}

interface IAddTask{
  addTask: (text:string, day:string, reminder:boolean) => void
}

export default AddTask