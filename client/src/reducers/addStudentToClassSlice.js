import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { routePostCall } from '../actions/routeService';
import { toast } from 'react-toastify';
import {ModelTypes, ModelActionTypes as Model} from '../constants/types';

export const addToClass = createAsyncThunk('addStudent', async (payload, thunkAPI) => {
    try {
        return await routePostCall(payload, ModelTypes.CLASS, Model.ADD_STUDENT)
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
});

export const addStudentToClassSlice = createSlice({
    name: "addStudentToClass",
    initialState: {
        isLoading: false,
        msg: '',
        error: false,
        course: ''
    },
    // actions below to modify state
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToClass.pending, (state) => {
                state.error = false;
                state.isLoading = true;
            })
            .addCase(addToClass.fulfilled, (state, action) => {
                state.error = false;
                state.msg = action.payload.msg;
                state.isLoading = false;
                state.course = action.payload.course;
               toast.success(action.payload.msg, { position: 'top-center' })
            })
            .addCase(addToClass.rejected, (state, action) => {
                state.error = true;
                state.isLoading = false;
                state.msg = action.payload.msg;
                toast.error(action.payload.msg, { position: 'top-center' });
            })
    }
});

export default addStudentToClassSlice.reducer;