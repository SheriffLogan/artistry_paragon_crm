//src\components\FrostUI\Dropdown\DropdownToggle.jsx
import { useContext, useRef } from 'react'
import { DropdownContext } from './dropdownContext'
import { useOutsideClick } from '../../../hooks'

export const DropdownToggle = ({ children, as: Tag = 'button', classNames }) => {
    const { isOpen, handleDropdown, handleKeyPress } = useContext(DropdownContext);
    const ref = useRef(null);

    const onClickOutside = () => {
        handleDropdown(false);
    };

    useOutsideClick(ref, onClickOutside);

    return (
        <Tag ref={ref} className={`${classNames ? classNames : ''} ${isOpen ? 'open' : ''}`} onClick={handleDropdown} onKeyDown={handleKeyPress}>
            {children}
        </Tag>
    );
};