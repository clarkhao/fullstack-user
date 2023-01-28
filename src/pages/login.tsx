/**
 * 登陆页面
 */
import { Fragment } from "react";
import Input from "../component/ui/input";
import style from './login.module.css';
import type {InputProps} from '../component';
import React from "react";
import {FiMail} from 'react-icons/fi';
export default function Login() {
    const [email, setEmail] = React.useState('');
    return <Fragment>
        <div className={style.login}>
            <div className={style.left}>
                <div className={style.icon}></div>
                <div className={style.welcome}></div>
                <div className={style.form}>
                    <Input 
                        icon={FiMail}
                        type="email"
                        name="email"
                        value={email}
                        placeholder="电子邮箱"
                    />
                </div>
            </div>
            <div className={style.right}></div>
        </div>
    </Fragment>
}