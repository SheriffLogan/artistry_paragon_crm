import React from 'react';

const Spinner = ({ tag: Tag = 'div', type = 'bordered', className, color, size, children }) => {
	return (
		<Tag role="status" className={`${type === 'bordered' ? 'spinner-border' : type === 'grow' ? 'spinner-grow' : ''} ${color ? `text-${color}` : 'text-secondary'} ${size ? 'avatar-' + size : ''} ${className}`}>
			{children}
		</Tag>
	);
};

export default Spinner;
