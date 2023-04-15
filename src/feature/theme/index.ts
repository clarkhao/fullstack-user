import {create} from 'zustand';

interface IThemeStore {
    themeMode: string;
    toggleThemeMode: () => void;
}

export const useThemeStore = create<IThemeStore>( (set) => ({
    themeMode: 'light',
    toggleThemeMode: () => set(state => ({themeMode: state.themeMode === 'light' ? 'dark': 'light'}))
}))