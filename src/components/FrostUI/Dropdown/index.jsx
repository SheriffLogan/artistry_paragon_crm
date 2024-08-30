import { useState } from 'react'
import { DropdownContext } from './dropdownContext'
import { DropdownToggle } from './DropdownToggle'
import { DropdownMenu } from './DropdownMenu'


const Dropdown = ({ children }) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const handleDropdown = (setTo) => {
        if (setTo === false) setDropDownOpen(setTo);
        else setDropDownOpen(!dropDownOpen);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') handleDropdown(false);
    };

    return (
        <DropdownContext.Provider value={{ isOpen: dropDownOpen, handleDropdown, handleKeyPress }}>
            {children}
        </DropdownContext.Provider>
    );
};

export default Object.assign(Dropdown, {
    Toggle: DropdownToggle,
    Menu: DropdownMenu,
});
