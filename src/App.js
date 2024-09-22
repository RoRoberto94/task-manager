import { useEffect, useState } from 'react';
import CreateTask from './components/NewTask/CreateTask';
import ListTasks from './components/ListTasks/ListTasks';
import './App.css';
import { LOCAL_STORAGE_TASKS, TASKS_STATUS } from './constants';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, newTask] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASKS)) || []);


  const loadLocalTasks = () => {
    const isSavedTasks = localStorage.getItem(LOCAL_STORAGE_TASKS);
    if (isSavedTasks) {
      newTask(JSON.parse(isSavedTasks))
    } else {
      saveLocalTasks()
    }
  };

  const saveLocalTasks = () => {
    localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(tasks))
  };


  const createTask = (title, description) => {
    //You can't mutate the array tasks, use second args, 'newTask'
    if (title.length > 0 && description.length > 0) {
      //Don't create empty title description tasks
      newTask([...tasks,
      {
        id: uuidv4(),
        title: title,
        description: description,
        date: new Date(),
        status: TASKS_STATUS.NEW,
        lastModified: new Date(),
      }
      ])
    } else {
      alert("Title & Description is mandatory")
    }
  };

  const deleteTask = (idToRemove) => {
    console.log(idToRemove)
    //Dont mutate the array tasks, create new one with deleted task based on
    // index
    const question = window.confirm("Are you sure you want to delete this task?");
    if (question) {
      const newTasks = [...tasks].filter((task) => task.id !== idToRemove)
      console.log(newTasks);
      newTask(newTasks);
    }
  }

  const handleEdit = ({ id, title, description, status, date }) => {
    // No need to use id:id, title:title if object key and value is the same name
    const payload = {
      id,
      title,
      description,
      date,
      status,
      lastModified: new Date(),
    };
    const ediedTask = [...tasks];
    // Find index for task edit GUID
    var foundIndex = ediedTask.findIndex(task => task.id == id);
    // Replace with the new one
    ediedTask.splice(foundIndex, foundIndex !== -1 ? 1 : 0, payload);
    newTask(ediedTask);
  }

  useEffect(() => {
    // Run this code once, just when component is loaded first time
    loadLocalTasks();
  }, []);

  useEffect(() => {
    //Everytime tasks is cahnging run this code
    saveLocalTasks();
  }, [tasks]);

  return (
    <div className="App">
      This is develop
      <CreateTask onCreate={createTask} />
      {tasks.length > 0 ?
        <ListTasks onEdit={handleEdit} onDelete={deleteTask} tasks={tasks} />
        : <p>No tasks has been created, plese create new task</p>}
    </div>
  );
}

export default App;
