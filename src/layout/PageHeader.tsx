import React from 'react';

interface PageHeaderProps {
    className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ className = '', children }) => {
    return <header className={className}>{children}</header>;
};
