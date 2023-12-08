import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { fetchUsers, addUser, deleteUser, editUser } from "./usersAPI";

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  data: UserData[] | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

export const fetchUserData = createAsyncThunk<UserData[]>(
  "users/fetchUsers",
  async () => {
    return fetchUsers();
  }
);


export const addNewUser = createAsyncThunk<UserData, { name: string; email: string }>(
  "users/addNewUser",
  async (newUserData) => {
    const response = await addUser(newUserData);
    return response;
  }
);

export const editUserByID = createAsyncThunk<UserData, { userId: number; name: string; email: string }>(
  "users/editUserByID",
  async (userData, { getState }) => {
    try {
      const existingUsers = (getState() as RootState).users.data || [];
      const userToUpdate = existingUsers.find((user) => user.id === userData.userId);

      if (!userToUpdate) {
        throw new Error("User not found for update");
      }

      const updatedUser = { ...userToUpdate, name: userData.name, email: userData.email };

      const response = await editUser(userData.userId, updatedUser);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "users/deleteUserById",
  async (userId: number) => {
    try {
      const response = await deleteUser(userId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: null,
    loading: "idle",
    error: null,
  } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error;
      })
      .addCase(addNewUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        if (state.data) {
          state.data.push(action.payload);
        }
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data =
          state.data?.filter((user) => user.id !== action.payload.id) || null;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error;
      })
      .addCase(editUserByID.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(editUserByID.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const updatedUser = action.payload;
        state.data =
          state.data?.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          ) || null;
      })
      .addCase(editUserByID.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error;
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.data;
export default usersSlice.reducer;
