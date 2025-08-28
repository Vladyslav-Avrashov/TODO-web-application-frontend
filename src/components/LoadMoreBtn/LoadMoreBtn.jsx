import { useDispatch, useSelector } from "react-redux";
import { incrementPage } from "../../redux/tasks/slice";
import { fetchTasks } from "../../redux/tasks/operations";
import {
  selectTasks,
  selectIsLoading,
  selectPagination,
} from "../../redux/tasks/selectors";
import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const tasks = useSelector(selectTasks);
  const pagination = useSelector(selectPagination);

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchTasks());
  };

  const shouldShowButton =
    tasks.length > 0 &&
    !isLoading &&
    pagination.hasMore &&
    pagination.page < pagination.totalPages;

  if (!shouldShowButton) return null;

  return (
    <button
      onClick={handleLoadMore}
      className={styles.loadMore}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
};

export default LoadMoreBtn;
