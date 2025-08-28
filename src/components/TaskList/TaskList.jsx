import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectVisibleTasks,
  selectIsLoading,
  selectError,
} from "../../redux/tasks/selectors";
import TaskCard from "../TaskCard/TaskCard";
import TaskForm from "../TaskForm/TaskForm";

import styles from "./TaskList.module.css";

const TaskList = () => {
  const [editingTask, setEditingTask] = useState(null);
  const visibleTasks = useSelector(selectVisibleTasks);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const handleEdit = (task) => setEditingTask(task);
  const handleFinishEditing = () => setEditingTask(null);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Task List</h2>
      {visibleTasks.length === 0 ? (
        <p className={styles.noTasks}>No tasks yet</p>
      ) : (
        <div className={styles.list}>
          {visibleTasks.map((task) =>
            editingTask && editingTask._id === task._id ? (
              <TaskForm
                key={task._id}
                taskToEdit={editingTask}
                onFinishEditing={handleFinishEditing}
              />
            ) : (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
