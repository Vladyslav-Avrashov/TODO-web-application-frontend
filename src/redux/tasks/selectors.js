import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state) => state.tasks.items;
export const selectStatus = (state) => state.tasks.status;
export const selectError = (state) => state.tasks.error;
export const selectAllCategories = (state) => state.tasks.categories;
export const selectFilters = (state) => state.tasks.filters;
export const selectSorting = (state) => state.tasks.sorting;
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectPagination = (state) => state.tasks.pagination;
export const selectVisibleTasks = createSelector(
  [selectTasks, selectFilters, selectSorting, selectAllCategories],
  (tasks, filters, sorting, categories) => {
    let visibleTasks = [...tasks];
    if (typeof filters.status === "boolean") {
      visibleTasks = visibleTasks.filter(
        (task) => task.isDone === filters.status
      );
    }
    if (filters.category !== "all") {
      visibleTasks = visibleTasks.filter((task) => {
        if (!task.category) return false;

        const selectedCategory = categories.find(
          (cat) => cat._id === filters.category
        );
        return selectedCategory && task.category === selectedCategory.name;
      });
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      visibleTasks = visibleTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          (task.description && task.description.toLowerCase().includes(term))
      );
    }

    if (sorting.priority === "asc") {
      visibleTasks.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    } else if (sorting.priority === "desc") {
      visibleTasks.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    }

    return visibleTasks;
  }
);
