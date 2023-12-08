import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import usersSlice from "../features/users/usersSlice" 

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store;
