/**
 * 登陆页面
 */
import { Fragment } from "react";
import Input from "../component/ui/input";
import style from './login.module.css';
import React from "react";

export default function Login() {
    const [email, setEmail] = React.useState('');
    return <Fragment>
        <div className={style.login}>
            <div className={style.left}>
                <div className={style.icon}></div>
                <div className={style.welcome}></div>
                <div className={style.form}>
                    <Input 
                        type="email"
                        id="login_input"
                        name="email"
                        value={email}
                    />
                </div>
            </div>
            <div className={style.right}></div>
        </div>
    </Fragment>
}