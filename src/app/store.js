import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/task/taskSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        theme: themeReducer,
    },
})