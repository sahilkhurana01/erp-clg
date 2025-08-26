// src/layout/index.jsx
import React from 'react';
import BottomNav from './components/BottomNav';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            <BottomNav />
        </div>
    );
};

export default Layout;
