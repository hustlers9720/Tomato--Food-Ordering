import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const Login = ({ setShowLogin }) => {

    const [state, setState] = useState('Sign Up')
    const { backendUrl, setToken } = useContext(StoreContext)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = backendUrl
        if (state === 'Login') {
            newUrl += '/api/user/login'
        }
        else {
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl, data);
        // console.log(response.data.token);
        if (response.data.success) {
            setToken(response.data.token);
            // console.log(response.data.token);

            localStorage.setItem('token', response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }
    }

    return (
        <div className='login'>
            <form onSubmit={onLogin} className="login-container">
                <div className="login-title">
                    <h2>{state}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-input">
                    {state === 'Login' ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{state === 'Sign Up' ? "Create Account" : 'Login'}</button>
                <div className='login-condition'>
                    <input type="checkbox" required />
                    <p>By continuing , i agree to the terms of Privacy Policy</p>
                </div >
                {state === 'Login' ? <p>Create a new Account ? <span onClick={() => setState('Sign Up')}>Click here</span></p> :
                    <p>Already have a Account? <span onClick={() => setState('Login')}>Login here</span></p>
                }

            </form>
        </div>
    )
}

export default Login
