import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  status: 'idle',
  error: null,
};

export const fetchJobs = createAsyncThunk('jobs/fetchjobs', async () => {
  const response = await fetch('/api/jobs')
  return response.json()
});

export const addJob = createAsyncThunk('jobs/addJob', async (newJob) => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(newJob),
  });
  return response.json();
});

export const updateJob = createAsyncThunk('/jobs/updateJob', async ({id, updateData}) => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json'},
    body: JSON.stringify(updateData),
  })
});

export const deleteJob = createAsyncThunk('/jobs/deleteJob', async (id) => {
  await fetch(`/api/jobs/${id}`, { method: 'DELETE'});
  return id;
})



const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fullfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((job) => job.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload)
      });
  },
})

export default jobSlice.reducer;