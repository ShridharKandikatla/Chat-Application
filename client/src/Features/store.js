import { configureStore } from '@reduxjs/toolkit';
import ThemeSliceReducer from './ThemeSlice';
import refreshSidebar from './refreshSidebar';

export const store = configureStore({
  reducer: {
    themeKey: ThemeSliceReducer,
    refreshKey: refreshSidebar,
  },
});
