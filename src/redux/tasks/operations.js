import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const page = state.tasks.pagination.page;
      const perPage = 10;

      const response = await api.get("/tasks", {
        params: {
          page: page,
          perPage: perPage,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, thunkAPI) => {
    try {
      const response = await api.post("/tasks", taskData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData, thunkAPI) => {
    try {
      const { _id, ...fieldsToUpdate } = taskData;
      const response = await api.patch(`/tasks/${_id}`, fieldsToUpdate);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "tasks/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
