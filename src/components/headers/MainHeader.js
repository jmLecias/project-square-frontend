import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { useAuth } from "../../hooks/useAuth";
import { useRecognize } from '../../hooks/useRecognize';

const MainHeader = () => {
    const { user, logout, isDetecting } = useAuth();
    const { isScanning } = useRecognize();
    const navigate = useNavigate();

    return (
        <header className='header-area'>
            <div className='logo-container'>
                <div className='logo-div'>
                    <img
                        src={"/images/resight2.png"}
                        alt={`resight logo`}
                    />
                </div>
                <span className='logo-text'>SQUARE</span>
            </div>
            {(!user) && (
                <div class='justify-content-between'>
                    <Button
                        onClick={() => { navigate('/auth/login') }}
                        style={{
                            backgroundColor: 'var(--primary-color)',
                            fontSize: '15px',
                            marginRight: '12px ',
                        }}
                    >
                        LOGIN
                    </Button>
                    <Button
                        onClick={() => { navigate('/auth/register') }}
                        style={{
                            backgroundColor: 'var(--primary-color)',
                            fontSize: '15px',
                        }}
                    >
                        REGISTER
                    </Button>
                </div>
            )}
            {(user) && (
                <div className='d-flex align-items-center'>
                    <div className='header-user-div '>
                        <img
                            src={"/images/user_default.jpg"}
                            alt={`user_image`}
                        />
                    </div>
                    <div>
                        <div className='small'>
                            {user.email}
                        </div>
                        <button
                            onClick={() => {
                                logout().then(() => {
                                    navigate('/', {replace: true})
                                })
                            }}
                            className='logout-btn'
                            disabled={isScanning}
                        >
                            {(isScanning)? 'Still Scanning...' : 'Logout'}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default MainHeader;