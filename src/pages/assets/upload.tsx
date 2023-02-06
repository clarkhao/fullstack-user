/**
 * upload files
 * 在DropZone中使用children-IconChoose，减少重新渲染
 * 使用FormData上传单个或者多个文件
 * files需要验证 类型,extension和size，然后上传
 */
import { Fragment } from "react";
import style from '../../styles/assetsUpload.module.css';
import CardLayout from "../../component/layout/card";
import Button from "../../component/ui/button";
import DropZone from "../../component/ui/dropZone";
import React from 'react';
import IconChoose from "../../component/ui/icon";
import {FileListType,FileNameListType,FileErrMsgType} from '../../component/type';
import uniqid from 'uniqid';
import {modifyAndValidate} from '../../utils/validate/file';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosProgressEvent } from "axios";

function Upload() {   
    /**
     * fileList used to generate FormData
     * fileNames used to render the List component
     */
    const [fileList, setFileList] = React.useState<FileListType[]>([])
    const [fileNames, setFileNames] = React.useState<FileNameListType[]>([])
    const [error, setError] = React.useState<FileErrMsgType>({name:'',msg:[]});
    const [progress, setProgress] = React.useState(0);
    const addFiles = (data: FileList | File[]) => {
        const files = [] as FileListType[];
        const names = [] as FileNameListType[];
        for(let i = 0; i < data.length; i++) {
            const file = data[i];
            const validated = modifyAndValidate(file);
            if(validated.success) {
                const id = uniqid();
                files.push({id, file});
                names.push({id, name: file.name});
            } else {
                let msg: string[] = []
                for(const e of validated.error.issues) {
                    msg.push(e.message);
                }
                setError({name: file.name, msg});
            }
        }
        setFileList([...fileList, ...files]);
        setFileNames([...fileNames, ...names]);
    }
    React.useEffect(() => {
        if(error.msg.length > 0) {
            toast.error(error.name);
            for(const e of error.msg) {
                toast.error(e);
            }
        }
    },[error])
    const removeFiles = (id: string) => {
        setFileList(fileList.filter((el) => el.id !== id));
        setFileNames(fileNames.filter(el => el.id !== id));
    }
    const handleSubmit: React.MouseEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        fileList.forEach(f => {
            formData.append('filename', f.file);
        })
        axios({
            url: process.env.NEXT_PUBLIC_DETA_FILE_API as string,
            method: 'POST',
            data: formData, 
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (e:AxiosProgressEvent) => {
                setProgress(Math.round((e.progress as number) * 100));
            }
        })
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.error(err);
        })
    }
    return (
        <Fragment>
            <form className={style.container}>
                <div className={style.title}>
                    <h1>Upload Your Files</h1>
                </div>
                <div className={style.drag}>
                    <DropZone handleAddFiles={addFiles}
                        list={fileNames}
                        children={<IconChoose iconType="import" iconSize={5} />}
                        handleRemove={removeFiles}
                        err={error}/>
                </div>
                <div className={style.confirm}>
                    <Button label="Upload files" onClick={handleSubmit}/>
                </div>
            </form>
            <ToastContainer />
        </Fragment>
    )
}

export default function UploadPage({}) {
    return <CardLayout childrend={<Upload />} />
}