import React from 'react'
import "./index.css"
import { LoginForm } from './loginForm'

const Login: React.FC = () => {
    return (
        <div className="box">
            <LoginForm></LoginForm>
        </div>
    )
}

export default Login;