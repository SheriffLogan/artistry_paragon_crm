//src\components\FrostUI\Collapse\index.jsx
import { useContext, useState } from 'react';
import { CollapseContext } from './collapseContext';
import CollapseToggle from './CollapseToggle';
import CollapseMenu from './CollapseMenu';

// Collapse component definition in JavaScript
const Collapse = ({ children, open, toggleCollapse }) => {
    const [collapseOpen, setCollapseOpen] = useState(false);

    // Function to handle the toggling of the collapse component
    const handleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    };

    return (
        <CollapseContext.Provider
            value={{
                open: open !== undefined ? open : collapseOpen,
                handleCollapse: toggleCollapse || handleCollapse,
            }}
        >
            {children}
        </CollapseContext.Provider>
    );
};

// Assign subcomponents to the Collapse function for easy access
export default Object.assign(Collapse, {
    Toggle: CollapseToggle,
    Menu: CollapseMenu,
});
