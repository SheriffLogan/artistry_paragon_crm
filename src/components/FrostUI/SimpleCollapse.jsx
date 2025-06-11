//src\components\FrostUI\SimpleCollapse.jsx
import { ElementType, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


// Define the CollapseProps structure for component props
const SimpleCollapse = ({ in: isOpen, children, classNames, as: Tag = 'div' }) => {
    const contentRef  = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
        if (isOpen) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setMaxHeight('0px');
        }
        }
    }, [isOpen]);

    // const height = open ? ref.current?.scrollHeight ?? 0 : 0;

    return (
        <Tag // Use Tag as a wrapper, default to 'div'
        ref={contentRef}
        className={`transition-all overflow-hidden ${classNames || ''}`}
        style={{ maxHeight: maxHeight }}
        >
        {children}
        </Tag>
    );
};

export default SimpleCollapse;
