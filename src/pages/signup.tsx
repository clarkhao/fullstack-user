/**
 * 注册页面
 */
import style from '../styles/signup.module.css';
import Input from "../component/ui/input";
import {FiUser,FiMail,FiLock} from "react-icons/fi";
import React, { useState,useEffect } from 'react';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [rePwd, setRePwd] = useState('');
    /**
     * 后面改为_document.tsx中操作全局css
     */
    useEffect(() => {
        const el = document.getElementById("__next") as Element
        el.className = "layout-light";
      }, []);
    
    return (
        <form className={style.container}>
            <div className='header'>
                创建账户
            </div>
            <div className='main'>
                <Input 
                    type="text"
                    id='signup_name'
                    name="signup_name"
                    value={name}
                    isErr={true}/>
                <Input 
                    type='email'
                    id='signup_email'
                    name='signup_email'
                    value={email}
                    isErr={true}/>
                <Input 
                    type='password'
                    id='signup_pwd'
                    name='signup_pwd'
                    value={pwd}
                    isErr={true}/>
                <Input 
                    type='password'
                    id='signup_repwd'
                    name='signup_repwd'
                    value={rePwd}
                    isErr={true}/>
                <button>OK</button>
            </div>
            <div className='oauth'>github</div>
            <div className='tolog'>tologin</div>
        </form>
    )
}

export default SignUp;