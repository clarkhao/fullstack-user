import style from './dropZone.module.css';
import React from 'react';
import {css} from '@emotion/react';
import List from "./list";
import IconChoose from './icon';
import {FileNameListType,FileErrMsgType} from '../type';

export type DropZoneType = {
    /**
     * 
     */
    handleAddFiles: (data: FileList | File[]) => void;
    /**
     * height of the container
     */
    height?: string;
    /**
     * formData passed by page
     */
    list: FileNameListType[];
    /**
     * children component
     */
    children: JSX.Element
    /**
     * remove item handler
     */
    handleRemove?: (id:string) => void;
    /**
     * is the file drop here an error?
     */
    err: FileErrMsgType;
}

function DropZone({handleAddFiles, children=<IconChoose iconType="import" iconSize={5} /> , ...props}: DropZoneType) {
    const [dragActive, setDragActive] = React.useState(false);
    const handleDrag: React.DragEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }
    const handleDragOver: React.DragEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }
    const handleDragLeave: React.DragEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }
    const handleDrop: React.DragEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        console.log(e.dataTransfer.files);
        handleAddFiles(e.dataTransfer.files);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files)
            handleAddFiles(e.target.files);
    }
    return (
        <div 
            className={[style.container, (dragActive?style.highlight:'')].join(' ')}
            css={css`height: ${props.height};`}
            onDragEnter={handleDrag}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input type='file' id="drop-files" multiple className={style.upload} onChange={handleChange}/>
            <label htmlFor="drop-files" className={style.droparea}>
                {children}
            </label>
            <div className={style.list}>
                {props.list?.length > 0 ? <List 
                        list={props.list}
                        rIcon='trash'
                        handleRemove={props.handleRemove}/> : <div className={style.before}>
                        <p>Drag & Drop your files here</p>
                        <p>or Click to select files</p>
                    </div>}
            </div>
        </div>
    )
}

export default DropZone;