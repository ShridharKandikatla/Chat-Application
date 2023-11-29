import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: true,
  reducers: {
    toggleTheme: (state) => {
    //   state = !state;
      return !state
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
