import React from 'react';

const GroupHeaderLoading = () => {

    return (
        <>
            <div className='group-info w-50 animate-wave'>
                <div className='text-placeholder w-25 mb-3' />
                <div className='w-100'>
                    <div className='text-placeholder mb-2 w-75' style={{ height: '45px' }} />
                    <div className='text-placeholder w-50' />
                </div>
            </div>
            <div className='group-actions animate-wave'>
                <div className='icon-placeholder me-2' />
                <div className='icon-placeholder' />
            </div>
        </>
    );
}

export default GroupHeaderLoading;
