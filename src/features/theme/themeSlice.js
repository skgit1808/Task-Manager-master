import { createSlice } from "@reduxjs/toolkit";

const loadTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const saveTheme = (theme) => {
    localStorage.setItem("theme", theme);
};

const initialState = {
    theme: loadTheme(),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            saveTheme(action.payload);
        },
    },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;