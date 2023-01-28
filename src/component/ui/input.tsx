import { IconType } from "react-icons"
import style from './input.module.css';

type InputType = 'email' | 'password' | 'text'
export type InputProps = {
    icon: IconType,
    type: InputType,
    id?: string,
    name: string,
    value: string,
    placeholder: string,
    isErr?: boolean
}
const errHint = () => 'some error';
function Input(props: InputProps) {
    return (
        <div className={style.wrapper}>
            <props.icon />
            <input
                type={props.type}
                id={props.id}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
            />
            <p>{props.isErr && errHint()}</p>
        </div>
    )
}

export default Input;