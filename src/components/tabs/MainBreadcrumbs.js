import React from 'react';

import Dropdown from '../dropdowns/Dropdown';

import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { useSidebar } from '../../hooks/useSidebar';

const MainBreadcrumbs = () => {
    const { onBreadcrumbClick, breadcrumbs } = useBreadcrumbs();
    const { toggleCollapse } = useSidebar();

    return (
        <div className='breadcrumbs-container custom-scrollbar-hidden'>
            <div>
                <HiOutlineMenuAlt2 size={30} onClick={toggleCollapse} className='cursor-pointer me-3' />
            </div>
            {breadcrumbs.map((breadcrumb, index) => {
                return (
                    <div
                        className={`breadcrumb-text slide-right`}
                        key={index}
                        onClick={() => onBreadcrumbClick(index, breadcrumb.link)}
                    >
                        <div className={(index !== 0) ? 'me-2' : ''}> {(index !== 0) ? '/' : ''}</div>
                        <div
                            className={`text-truncate label ${(index === breadcrumbs.length - 1) ? 'active' : ''}`}
                        >
                            {breadcrumb.label}
                        </div>
                    </div>
                );
            })}
        </div>
    )
};

export default MainBreadcrumbs;
