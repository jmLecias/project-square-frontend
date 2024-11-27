import React from 'react';
import { ToastContainer } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const SquareLogo = () => {
        return (
            <div className='logo-div'>
                <img
                    src={"/official-square2.png"}
                    alt={`official square logo`}
                />
            </div>
        )
    };

    return (
        <div className="main-container" >
            <ToastContainer />

            <div className='content-area custom-scrollbar'>
                <div className='landing-container'>
                    <div className='landing-header-area'>
                        <div className='d-flex align-items-center'>
                            <SquareLogo />
                            <div className='logo-text ms-2'>SQUARE</div>
                        </div>

                        <button
                            title='Log in on an existing account'
                            className={`main-button me-3`}
                            style={{ backgroundColor: 'var(--primary-color-dark)' }}
                            onClick={() => navigate("/auth/login")}
                        >
                            Sign in
                        </button>
                    </div>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <div className='landing-main-container'>
                            <div className='landing-left-area '>
                                <div className='landing-text-bold'>
                                    Security Using <span style={{ color: 'var(--primary-color-light)' }}>AI</span>,
                                    <br /><span style={{ color: 'var(--primary-color)' }}>Remembering</span> Entities
                                </div>
                                <div className='landing-text' style={{ fontWeight: '100' }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </div>
                                <div className='d-flex flex-column w-50 align-items-center '>
                                    <button
                                        title='Register an account'
                                        className='landing-btn'
                                        onClick={() => { navigate('/auth/register') }}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                            <div className='landing-right-area'>
                                <div className='landing-img-div'>
                                    <img
                                        src='/svg/security-animate.svg'
                                        alt={'https://storyset.com/web'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
