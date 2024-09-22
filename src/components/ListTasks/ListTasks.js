import { TASKS_STATUS } from '../../constants';
import './ListTasks.css';
import TaskComp from './Task';

const ListTasks = (props) =>
    // Return the component
    <div className='list-tasks'>
        <div className='tasks-container'>
            <div className='task'>
                <span className='tasks-title'>New</span>
            </div>
            <div className='task'>
                <span className='tasks-title'>In progress</span>
            </div>
            <div className='task'>
                <span className='tasks-title'>Done</span>
            </div>
        </div>
        <div className='tasks-container' style={{ gap: '10px' }}>
            <div className='task tasks-new'>
                {props.tasks.filter((task) => task.status === TASKS_STATUS.NEW)?.map((task) => <TaskComp key={task.id} taskDetail={task} onDelete={props.onDelete} onEdit={props.onEdit} />)}
            </div>
            <div className='task tasks-in-progress'>
                {props.tasks.filter((task) => task.status === TASKS_STATUS.IN_PROGRESS)?.map((task) => <TaskComp key={task.id} taskDetail={task} onDelete={props.onDelete} onEdit={props.onEdit} />)}
            </div>
            <div className='task tasks-done'>
                {props.tasks.filter((task) => task.status === TASKS_STATUS.DONE)?.map((task) => <TaskComp key={task.id} taskDetail={task} onDelete={props.onDelete} onEdit={props.onEdit} />)}
            </div>
        </div>
    </div>

export default ListTasks;