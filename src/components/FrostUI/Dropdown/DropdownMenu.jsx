//src\components\FrostUI\Dropdown\DropdownMenu.jsx
import { useContext, useRef, useState } from 'react';
import { DropdownContext } from './dropdownContext';

// DropdownMenu component
export const DropdownMenu = ({ children, as: Tag = 'div', classNames, placement }) => {
    const { isOpen, handleDropdown } = useContext(DropdownContext);
    const placeAt = placement === 'start' ? 'start-0' : placement === 'end' ? 'end-0' : null;
    return (
        <Tag className={`${classNames ? classNames + ' ' : ''}${placeAt ? placeAt + ' ' : ''}${isOpen ? 'open ' : 'hidden '}`} onClick={handleDropdown}>
            {children}
        </Tag>
    );
};