import { useState, useEffect } from 'react';

import TaskList from '../TaskList/TaskList';
import { getTasks } from '../../asyncMock';
import FilterTask from '../FilterTask/FilterTask';

const TaskListContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valueSelect, setValueSelect] = useState('all');

  useEffect(() => {
    getTasks()
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChangeTaskState = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });

    setTasks(updatedTasks);
  };

  if (loading) {
    return (
      <main>
        <h1>Cargando tareas...</h1>
      </main>
    );
  }

  const handleChange = (e) => {
    setValueSelect(e.target.value);
  };

  const aplyFilter = (filterState) => {
    switch (filterState) {
      case 'all':
        return tasks;
      case 'completed':
        return tasks.filter((tasks) => tasks.completed);
      case 'uncompleted':
        return tasks.filter((tasks) => !tasks.completed);
      default:
        return tasks;
    }
  };

  return (
    <main>
      <h1>Lista de tareas</h1>
      <FilterTask handleChange={handleChange} value={valueSelect} />
      <TaskList
        tasks={aplyFilter(valueSelect)}
        handleChangeTaskState={handleChangeTaskState}
      />
    </main>
  );
};

export default TaskListContainer;
