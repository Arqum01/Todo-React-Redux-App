import todoSlice from "../features/todoSlice";
import { configureStore } from '@reduxjs/toolkit'
// import todoReducer from ‘./todoSlice’;

const store = configureStore({
 reducer: {
//  todos: todoReducer,
todos: todoSlice, 
 },
});

export default store;