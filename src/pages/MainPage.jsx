import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm/TaskForm";
import Filters from "../components/Filters/Filters";
import { fetchTasks, fetchCategories } from "../redux/tasks/operations";
import styles from "./MainPage.module.css";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Manager</h1>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <TaskForm />
          <Filters />
        </div>
        <div className={styles.main}>
          <TaskList />
          <LoadMoreBtn />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
