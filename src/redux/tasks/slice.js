import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
  fetchCategories,
} from "./operations";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    categories: [],
    isLoading: false,
    error: null,
    filters: {
      searchTerm: "",
      category: "all",
      status: "all",
    },
    sorting: {
      priority: "none",
    },
    pagination: {
      page: 1,
      perPage: 10,
      hasMore: true,
      totalItems: 0,
      totalPages: 0,
    },
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    setPrioritySort: (state, action) => {
      state.sorting.priority = action.payload;
    },
    incrementPage: (state) => {
      state.pagination.page += 1;
    },
    resetPagination: (state) => {
      state.pagination.page = 1;
      state.pagination.hasMore = true;
      state.items = [];
    },
    setHasMore: (state, action) => {
      state.pagination.hasMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const responseData = action.payload.data;
        if (state.pagination.page === 1) {
          state.items = responseData.items;
        } else {
          state.items = [...state.items, ...responseData.items];
        }
        state.pagination.hasMore = responseData.hasNextPage;
        state.pagination.totalItems = responseData.totalItems;
        state.pagination.totalPages = responseData.totalPages;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data || action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload.data || action.payload;
        state.items = state.items.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      })
      .addMatcher(
        isPending(fetchCategories, fetchTasks, addTask, updateTask, deleteTask),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isFulfilled(
          fetchCategories,
          fetchTasks,
          addTask,
          updateTask,
          deleteTask
        ),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(
          fetchCategories,
          fetchTasks,
          addTask,
          updateTask,
          deleteTask
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error?.message || action.payload;
        }
      );
  },
});

export const {
  setSearchTerm,
  setCategoryFilter,
  setStatusFilter,
  setPrioritySort,
  incrementPage,
  resetPagination,
  setHasMore,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
