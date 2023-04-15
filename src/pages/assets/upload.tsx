/**
 * upload files
 * 上传文件完成后跳转到文件展示和文件引用路径
 * 使用useReducer管理状态
 */
//应用模块
import React from 'react';
//style和主题
import style from '../../styles/assetsUpload.module.css';
import { PaletteMode, createTheme, ThemeProvider } from '@mui/material';
import { useThemeStore } from '../../feature/theme';
//组件
import CardLayout from "../../component/layout/card";
import Upload from '../../component/composite/upload';

export default function UploadPage({}) {
    const themeMode = useThemeStore(state => state.themeMode);
    const toggleThemeMode = useThemeStore(state => state.toggleThemeMode);
    const theme = React.useMemo( () => 
        createTheme({palette: {mode: themeMode as PaletteMode}}), 
    [themeMode])
    return (
        <ThemeProvider theme={theme}>
            <CardLayout childrend={<Upload />} />
        </ThemeProvider>
    )
}