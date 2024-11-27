import React from 'react';


const MemberItem = ({ member }) => {

    return (
        <div className='member-item' onClick={() => { }}>
            <div className='d-flex align-items-center'>
                <div className='member-profile-div'>
                    <img
                        src={member.image}
                        alt='Member image'
                    />
                </div>
                <div>
                    <div
                        className='fs-6 ms-3 text-truncate'
                    >{member.name}</div>
                    <div
                        className='small ms-3 text-truncate'
                    >{member.email}</div>

                </div>
            </div>
        </div>
    )
}

export default MemberItem;