import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { fetchUsers, addUser, deleteUser } from './usersAPI';

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  data: UserData[] | null;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any; 
}

export const fetchUserData = createAsyncThunk<UserData[]>('users/fetchUsers', async () => {
  try {
    const response = await fetchUsers();
    console.log(response, "response.data");
    return response;
  } catch (error) {
    throw error;
  }
});

export const addNewUser = createAsyncThunk<UserData, { name: string; email: string }>(
    'users/addNewUser',
    async (newUserData, { getState }) => {
      try {
        const existingUsers = (getState() as RootState).users.data || [];
        const newUserId = existingUsers.length + 1;
        const newUser: UserData = {
          id: newUserId,
          name: newUserData.name,
          email: newUserData.email,
        };
        const response = await addUser(newUser);
        return response;
      } catch (error) {
        throw error;
      }
    }
  );
  export const deleteUserById = createAsyncThunk('users/deleteUserById', async (userId: number) => {
    try {
      const response = await deleteUser(userId);
      return response;
    } catch (error) {
      throw error;
    }
  });


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(addNewUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        if (state.data) {
          state.data.push(action.payload);
        }
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = state.data?.filter(user => user.id !== action.payload.id) || null;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.data;
export default usersSlice.reducer;
