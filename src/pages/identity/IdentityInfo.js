import React from 'react';

import { useIdentity } from '../../hooks/useIdentity';

const IdentityInfo = () => {

    const {
        handleChange,
        firstName,
        middleName,
        lastName,
        CAN_PROCEED_FACE,
        onStepNextClick,
    } = useIdentity();

    return (
        <>
            <div className='step-header-area'>
                <div className='fs-6'>Step 1 out of 4</div>
                <div className='step-title'>Personal Info</div>
            </div>
            <div className='step-left-area'>
                <div className='small mb-2'>First name</div>
                <input
                    name='firstName'
                    type='text'
                    placeholder='First name'
                    value={firstName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="form-control identity-setup-input"
                />

                <div className='small mb-2'>Middle name</div>
                <input
                    name='middleName'
                    type='text'
                    placeholder='Middle name (leave blank if not applicable)'
                    value={middleName}
                    onChange={handleChange}
                    maxLength={50}
                    required
                    className="form-control identity-setup-input"
                />

                <div className='small mb-2'>Last name</div>
                <input
                    name='lastName'
                    type='text'
                    placeholder='Last name'
                    value={lastName}
                    onChange={handleChange}
                    maxLength={50}
                    required
                    className="form-control identity-setup-input"
                    style={{ marginBottom: '60px' }}
                />

                <div>
                    <button
                        className='main-button'
                        disabled={!CAN_PROCEED_FACE}
                        onClick={onStepNextClick}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className='step-right-area'>
                <img src='/svg/personal-site-animate.svg' alt="img" />
            </div>
        </>
    );
};

export default IdentityInfo;
