import React from 'react';
import GroupHeaderLoading from '../../components/headers/GroupHeaderLoading';
import SectionHeaderLoading from '../../components/headers/SectionHeaderLoading';
import PlaceholderItem from '../../components/items/PlaceholderItem';

const GroupPageLoading = () => {

    const renderPlaceholderItems = (count, aspectRatio) => {
        const items = [];
        for (let i = 0; i < count; i++) {
            items.push(
                <PlaceholderItem
                    aspectRatio={aspectRatio}
                    key={i}
                />
            );
        }
        return items;
    };

    return (
        <div
            className={`group-locations-container fade-in`}
        >
            <div className='group-analytics-area animate-wave'>
                <SectionHeaderLoading />
                <div className='group-grid-display'>
                    {renderPlaceholderItems(4, '4 / 2')}
                </div>
            </div>
            <div className='group-locations-area animate-wave'>
                <SectionHeaderLoading />
                <div className='group-grid-display'>
                    {renderPlaceholderItems(6, '6 / 5')}
                </div>
            </div>
        </div>
    );
}

export default GroupPageLoading;
