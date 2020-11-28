import React, { useEffect, useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook';

export default function AuthPage() {
    const auth = useContext(AuthContext)
    const { loading, error, request, clearError } = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
    }, [error, message])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', "POST", { ...form })
            console.log('data', data)
            message(data.message)

        } catch (e) { }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', "POST", { ...form })
            console.log('DATA', data)
            auth.login(data.token, data.userId)

        } catch (e) { }

    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Increase link</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authentication</span>
                        <div>
                            <div className="input-field ">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={changeHandler}
                                    placeholder="Enter you email"
                                />
                                <label htmfor="last_name">Email</label>
                            </div>
                            <div className="input-field ">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="validate"
                                    onChange={changeHandler}
                                    placeholder="Your password"
                                />
                                <label htmfor="last_name">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn green darken-2"
                            style={{ marginRight: 10 }}
                            disabled={loading}
                            onClick={loginHandler}
                        >Enter</button>
                        <button
                            className="btn yellow darken-4"
                            onClick={registerHandler}
                            disabled={loading}
                        >Register</button>
                    </div>
                </div>

            </div>
        </div>
    )
}