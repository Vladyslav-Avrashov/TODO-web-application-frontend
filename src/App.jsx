import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks, fetchCategories } from "./redux/tasks/operations";
import MainPage from "./pages/MainPage";
import styles from "./App.module.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <MainPage />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
