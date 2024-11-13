import React from 'react';

const SectionHeaderLoading = ({actions}) => {
    return (
        <div className='section-header '>
            <div className='d-flex align-items-center w-50' >
                <div className='icon-placeholder me-2' />
                <div className='text-placeholder mb-2' style={{width: '100%', maxWidth: '300px'}}/>
            </div>
            <div>
                {actions}
            </div>
        </div>
    );
};

export default SectionHeaderLoading;