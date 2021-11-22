import { useState, useEffect } from "react";
import { getProjectTasks, deleteTask, addTask } from "../utils/todoist-api";
import Task from "./Task";
import NewTaskForm from "./NewTaskForm";

const TasksList = ({ projectId }) => {
  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    getProjectTasks(projectId).then((tasks) => {
      setProjectTasks(tasks);
    });
  }, [projectId]);

  const onTaskDelete = (id) => {
    deleteTask(id);
    const tasks = projectTasks.filter((task) => task.id !== id);
    setProjectTasks(tasks);
  };

  const onTaskSubmit = (text, resetForm) => {
    addTask(text, Number(projectId))
    setProjectTasks([{content: text}, ...projectTasks]);
    resetForm();
  };

  return (
    <div class="todolist__list">
      <NewTaskForm onSubmit={onTaskSubmit} />
      <div class="todolist__tasks">
        {/* Надо исправить: При отрисовке элементов массива, важно добавлять 
        к ним аттрибут key с уникальным значением. Подробнее о данной особенности React 
        можно узнать здесь: 
        https://ru.reactjs.org/docs/lists-and-keys.html
        */}
        {projectTasks.map((task) => (
          <Task task={task} onDelete={onTaskDelete} />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
