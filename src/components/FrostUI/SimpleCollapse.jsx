import { ElementType, useRef } from 'react';

// Define the CollapseProps structure for component props
const SimpleCollapse = ({ open, children, classNames, as: Tag = 'div' }) => {
    const ref = useRef(null);
    const height = open ? ref.current?.scrollHeight ?? 0 : 0;

    return (
        <Tag ref={ref} className={`transition-all overflow-hidden ${classNames || ''}`} style={{ height: height }}>
            {children}
        </Tag>
    );
};

export default SimpleCollapse;
