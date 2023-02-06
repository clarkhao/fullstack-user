import {FiMail, FiLock, FiUser, FiFile, FiTrash2} from 'react-icons/fi';
import {FcImport} from "react-icons/fc";

export type InputType = 'email' | 'password' | 'text';
export const iconLibrary: Map<string, JSX.Element> = new Map([
    ['email', <FiMail />],
    ['password', <FiLock />],
    ['text', <FiUser />],
    ['file', <FiFile />],
    ['trash', <FiTrash2 />],
    ['import', <FcImport />]
]);
export type FileListType = {
    id: string;
    file: File;
}
export type FileNameListType = {
    id: string;
    name: string;
}
export type FileErrMsgType = {
    name: string;
    msg: string[];
}