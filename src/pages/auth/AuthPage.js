import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import StorageService from '../../services/StorageService';

const AuthPage = ({ type }) => {
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const ss = new StorageService();

    const [loader, setLoader] = useState(type === 'login' ? 'Log in' : 'Register');
    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        setLoader(type === 'login' ? 'Log in' : 'Register');
    }, [type]);

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
            errors: {
                ...prevState.errors,
                [field]: '',
            },
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        const credentials = { email: state.email, password: state.password };
        setLoader(type === 'login' ? 'Logging in...' : 'Registering...');

        try {
            const user = type === 'login'
                ? await login(credentials)
                : await register(credentials);

            if (user) {
                if (type === "register") {
                    window.location.replace(`/auth/register/identity/` + user.id);
                } else if (type === "login") {
                    window.location.replace('/dashboard');
                }

                setLoader(type === 'login' ? 'Log in' : 'Register');
            }
        } catch (res) {
            setLoader(type === 'login' ? 'Log in' : 'Register');
            toast.error(res.response.data.error, {
                position: 'top-center',
                autoClose: 2500,
                hideProgressBar: true,
            });
        }
    };

    const validateForm = () => {
        const { email, password } = state;
        let errors = {};

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\w+$/;
            if (!emailRegex.test(email)) {
                errors.email = 'Email is not in a valid format';
            }
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
        }

        setState(prevState => ({
            ...prevState,
            errors: errors
        }));

        return Object.keys(errors).length === 0;
    };

    return (
        <div>
            <ToastContainer />

            <div className='auth-main-container'>
                <div className='mx-auto auth-form-container'>
                    <div className='logo-container mt-3'>
                        <div className='logo-div'>
                            <img
                                src={"/official-square2.png"}
                                alt={`official square logo`}
                            />
                        </div>
                        <span className='logo-text ms-2' style={{ color: 'var(--background-light)' }}>SQUARE</span>
                    </div>

                    <div className='d-flex flex-column align-items-center w-100'>
                        <div className='auth-text-bold'>
                            {((type === 'login') ? "Welcome Back" : "Create an account")}
                        </div>

                        <div className='auth-form-input-container'>
                            <input
                                name='email'
                                type='email'
                                id='email'
                                placeholder='Email'
                                value={state.email}
                                onChange={handleChange}
                                required
                                className="form-control auth-form-input"
                            />
                            {state.errors.email && (
                                <div className="error-message">{state.errors.email}</div>
                            )}
                        </div>

                        <div className='auth-form-input-container'>
                            <input
                                name='password'
                                id='password'
                                type='password'
                                placeholder='Password'
                                value={state.password}
                                onChange={handleChange}
                                required
                                className="form-control  auth-form-input"
                            />
                            {state.errors.password && (
                                <div className="error-message">{state.errors.password}</div>
                            )}
                        </div>

                        <button
                            className='auth-form-btn'
                            onClick={handleSubmit}
                            disabled={loader === "Logging in..."}
                        >
                            {loader === "Logging in..." && <Spinner animation="border" size='sm' />}
                            <span className='text-white ms-2'>{loader}</span>
                        </button>

                        <span className='auth-text-small'>{((type === 'login') ? "Don't have an account?" : "Already have an account?")}
                            <strong
                                style={{ color: 'var(--primary-color-dark)' }}
                                className='cursor-pointer ms-1'
                                onClick={() => {
                                    if (type === "login") {
                                        navigate('/auth/register');
                                    } else {
                                        navigate('/auth/login');
                                    }
                                }}
                            >{((type === 'login') ? "Sign up" : "Sign in")}</strong>
                        </span>

                        {/* <button
                            className='auth-form-btn-clear'
                            onClick={() => {loginGoogle()}}
                        >
                            Continue with Google
                        </button> */}

                        <button
                            className='auth-form-btn-clear'
                            onClick={() => { navigate('/') }}
                        >
                            Back to homepage
                        </button>
                    </div>

                    <div className='auth-footer-container'>
                        <div
                            className='cursor-pointer auth-text-footer'
                            onClick={() => { navigate('/terms-of-use') }}>Terms of use</div>
                        <div
                            style={{
                                height: '20px',
                                width: '1px',
                                backgroundColor: 'var(--primary-color)',
                                margin: '5px'
                            }}
                        />
                        <div
                            className='cursor-pointer auth-text-footer'
                            onClick={() => { }}>Privacy Policy</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
