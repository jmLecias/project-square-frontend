import React from 'react';

const ContentContainer = ({ children, header}) => {

    return (
        <div className="content-container">
            <div className='content-header-area'>
                {header}
            </div>
            <div className='content-content-area'>
                {children}
            </div>
        </div>
    )
}

export default ContentContainer;