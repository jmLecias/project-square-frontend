import React from 'react';


const PlaceholderItem = ({ aspectRatio }) => {

    return (
        <div className='item-placeholder' style={{aspectRatio: aspectRatio}}>
        </div>
    )
}

export default PlaceholderItem;