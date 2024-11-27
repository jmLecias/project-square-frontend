import { createContext, useContext, useMemo, useState } from "react";

const SidebarContext = createContext();

const PAGES = {
    DASHBOARD: 'dashboard',
    GROUPS: 'groups',
    LOCATIONS: 'locations',
    RECORDS: 'records',
    SETTINGS: 'settings',
}

export const SidebarProvider = ({ children }) => {
    const [collapse, setCollapse] = useState(true);
    const [activePage, setActivePage] = useState('');

    const toggleCollapse = () => setCollapse(!collapse);

    const handleClick = (page) => {
        setActivePage(page)
        setCollapse(true);
    };

    const value = useMemo(
        () => ({
            collapse,
            toggleCollapse,
            activePage,
            handleClick,
            PAGES,
        }),
        [collapse, activePage]
    );
    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
    return useContext(SidebarContext);
};