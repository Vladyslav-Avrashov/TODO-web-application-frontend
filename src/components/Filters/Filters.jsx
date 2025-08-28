import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setCategoryFilter,
  setStatusFilter,
  setPrioritySort,
} from "../../redux/tasks/slice";
import {
  selectAllCategories,
  selectFilters,
  selectSorting,
} from "../../redux/tasks/selectors";

import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const sorting = useSelector(selectSorting);
  const categories = useSelector(selectAllCategories);
  const isLoading = useSelector((state) => state.tasks.isLoading);

  if (isLoading) return <div>Loading categories...</div>;

  const handleStatusChange = (e) => {
    const value = e.target.value;
    const newStatus = value === "all" ? "all" : value === "true";
    dispatch(setStatusFilter(newStatus));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filters and Sorting</h3>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search..."
          value={filters.searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className={styles.input}
        />

        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className={styles.select}
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={String(filters.status)}
          onChange={handleStatusChange}
          className={styles.select}
        >
          <option value="all">All</option>
          <option value="true">Completed</option>
          <option value="false">Incomplete</option>
        </select>

        <select
          value={sorting.priority}
          onChange={(e) => dispatch(setPrioritySort(e.target.value))}
          className={styles.select}
        >
          <option value="none">No sorting</option>
          <option value="asc">Priority (ascending)</option>
          <option value="desc">Priority (descending)</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
