import React, { ChangeEvent, SetStateAction } from 'react'
import { useState } from 'react'

const AddTask = () => {

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

  return (
    <form className='add-form'>

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

export default AddTask