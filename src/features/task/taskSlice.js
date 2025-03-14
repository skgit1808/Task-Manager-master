import { createSlice } from '@reduxjs/toolkit'

const loadTasksFromStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
};

const saveTasksToStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState = {
    tasks: loadTasksFromStorage(),
    editingTask: null,
    filter: "all",
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: Date.now(),
                text: action.payload,
                completed: false,
                createdAt: new Date().toISOString(),
            };

            state.tasks = [...state.tasks, newTask];
            saveTasksToStorage(state.tasks);
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            saveTasksToStorage(state.tasks);
        },

        toggleComplete: (state, action) => {
            state.tasks = state.tasks.map((task) => (task.id === action.payload ? { ...task, completed: !task.completed } : task));
            saveTasksToStorage(state.tasks);
        },

        startEditing: (state, action) => {
            state.editingTask = action.payload;
        },

        updateTask: (state, action) => {
            state.tasks = state.tasks.map((task) => task.id === state.editingTask?.id ? { ...task, text: action.payload } : task);
            state.editingTask = null;
            saveTasksToStorage(state.tasks);
        },

        cancelEditing: (state) => {
            state.editingTask = null;
        },

        setFilter: (state, action) => {
            state.filter = action.payload;
        },

        loadTasks: (state) => {
            state.tasks = loadTasksFromStorage();
        },
    },
});

export const { addTask, deleteTask, toggleComplete, startEditing, updateTask, cancelEditing, setFilter, loadTasks } = taskSlice.actions;

export default taskSlice.reducer;