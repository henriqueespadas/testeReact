import { configureStore , combineReducers } from '@reduxjs/toolkit';
import usersReducer from './store/usersSlice';

const rootReducer = combineReducers({
  user: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;