import {FiMail, FiLock, FiUser, FiFile, FiTrash2} from 'react-icons/fi';
import {MdMoveToInbox} from "react-icons/md";

export const iconLibrary: Map<string, JSX.Element> = new Map([
    ['email', <FiMail />],
    ['password', <FiLock />],
    ['text', <FiUser />],
    ['file', <FiFile />],
    ['trash', <FiTrash2 />],
    ['import', <MdMoveToInbox />]
]);