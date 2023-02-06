import style from './input.module.css';
import type {InputType} from '../type/index';
import React from "react";
import IconChoose from "./icon";

export type InputProps = {
    /**
     * input type among email-password-text
     */
    type: InputType;
    /**
     * is there a id of html element?
     */
    id: string;
    /**
     * input name property
     */
    name: string;
    /**
     * the value of the input element
     */
    value: string;
    /**
     * Are there some Error hints?
     */
    isErr?: boolean;
    /**
     * error message got from backend inferred what the input error
     */
    errMsg?: string;
    /**
     * Optional click handler
     */
    onChange?: React.ChangeEventHandler;
}
const placeholderMap: Map<InputType, string> = new Map([
    ['email', '电子邮箱'],
    ['password', '密码'],
    ['text', '用户名']
])
function Input({
    type,
    id,
    name,
    value,
    isErr = false,
    ...props
}: InputProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleFocusHelper: React.MouseEventHandler = (e) => {
        e.preventDefault();
        if(inputRef.current) {
            inputRef.current.focus();
        }     
    }
    return (
        <div className={style.wrapper}>
            <div className={style.hover} onClick={handleFocusHelper}>
                <IconChoose iconType={type} iconSize={1.5}/>
                <input
                    ref={inputRef}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholderMap.get(type)}
                    className={isErr ? style.error : ''}
                    {...props}
                />
                <label htmlFor={id} className={style.label}>{placeholderMap.get(type)}</label>
            </div>
            <p>{isErr && props.errMsg}</p>
        </div>
    )
}

export default Input;