import { useState } from 'react';
import './createTask.css';

const CreateTask = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const submitNewTask = () => {
        //Apelam functia din props pentru create cea din parinte
        props.onCreate(title, description);
    }

    return (
        <div className="create-task">
            <h2 className='app-title'>My Task Manager</h2>
            <label htmlFor="title">Title</label>
            {/* OnChange onFocus onInput events... */}
            <input onChange={e => setTitle(e.target.value)} name="title" type="text" placeholder="Title" />
            <label htmlFor="description">Description</label>
            <input onChange={e => setDescription(e.target.value)} name="description" type="textarea" placeholder="Description" />
            <button onClick={submitNewTask} className="button">Create</button>
        </div>
    )
}
export default CreateTask;