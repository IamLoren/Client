import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setToken } from '../../axios/axios';
import { RegTypes } from './authSliceTypes';


export const registerThunk = createAsyncThunk(
    'auth/register',
    async (credentials:RegTypes, thunkApi) => {
      try {
        const { data } = await api.post('api/auth/signup', credentials);
        setToken(data.token);
        return data;
      } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
        return thunkApi.rejectWithValue(error.message);
        }else {
            toast.error('An unexpected error occurred');
          }
      }
    }
  );