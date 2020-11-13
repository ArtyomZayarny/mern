import React from 'react';

export default function AuthPage() {

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
                                    placeholder="Enter you email"
                                />
                                <label htmFor="last_name">Email</label>
                            </div>
                            <div className="input-field ">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="validate"
                                    placeholder="Your password"
                                />
                                <label htmFor="last_name">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn green darken-2" style={{ marginRight: 10 }}>Enter</button>
                        <button className="btn yellow darken-4">Register</button>
                    </div>
                </div>

            </div>
        </div>
    )
}