/**
 * upload files
 * 上传文件完成后跳转到文件展示和文件引用路径
 */
//应用模块
import React from 'react';
//style和主题
import style from '../../styles/assetsUpload.module.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../feature/theme/theme';
//组件
import CardLayout from "../../component/layout/card";
import Upload from '../../component/composite/upload';

export default function UploadPage({}) {
    return (
        <ThemeProvider theme={theme}>
            <CardLayout childrend={<Upload />} />
        </ThemeProvider>
    )
}