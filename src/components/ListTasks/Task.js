import { useEffect, useState } from 'react';
import './ListTasks.css';
import { TASKS_STATUS } from '../../constants';


const TaskComp = ({ taskDetail, onDelete, onEdit }) => {

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(taskDetail.title);
    const [description, setDescription] = useState(taskDetail.description);
    const [status, setStatus] = useState(taskDetail.status);

    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        if (title !== taskDetail.title ||
            description !== taskDetail.description ||
            status !== taskDetail.status
        ) {
            setIsEdited(true)
        } else {
            setIsEdited(false)
        }
    }, [title, description, status])

    const toggleEdit = () => setEditMode(!editMode);
    return <div className='task-container'>
        {!editMode && <span className='edit-btn' onClick={toggleEdit}>Click to edit</span>}
        {
            editMode ?
                <>
                This is develop
                    <div className='task-action'>
                        <button onClick={() => onDelete(taskDetail.id)}>Delete</button>
                        {isEdited ? <button onClick={() => {
                            onEdit({ ...taskDetail, title, description, status })
                            setIsEdited(false);
                            setEditMode(false);
                        }}>Save</button> : <button onClick={toggleEdit}>Cancel</button>}
                    </div>

                    <label htmlFor="title">
                        Title
                    </label>
                    <input onChange={e => setTitle(e.target.value)} id="title" type="text" placeholder='title' value={title} />
                    <label htmlFor="description">
                        Description
                    </label>
                    <input onChange={e => setDescription(e.target.value)} id="description" type="text" placeholder='description' value={description} />
                    <label htmlFor="status">
                        Status
                    </label>
                    <select style={{ marginBottom: '10px' }} id='status' value={status} name='status' onChange={e => setStatus(e.target.value)}>
                        <option value={TASKS_STATUS.NEW} >New</option>
                        <option value={TASKS_STATUS.IN_PROGRESS} > In progress </option>
                        <option value={TASKS_STATUS.DONE} > Done </option>
                    </select>

                </>
                :
                <>
                    <h3 className='task-title'>{taskDetail.title}</h3>
                    <div className='title-description'>{taskDetail.description}</div>
                    <span className='created-date'>{new Date(taskDetail.date).toLocaleDateString()} - {new Date(taskDetail.lastModified).toLocaleDateString()}</span>
                </>
        }
    </div >
}
export default TaskComp;