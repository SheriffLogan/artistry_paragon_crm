import React, { useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';

// utils
import { changeHTMLAttribute } from '../utils';

const loading = () => <div />;

const DefaultLayout = (props) => {
	const { layoutTheme } = useSelector((state) => ({
		layoutTheme: state.Layout.layoutTheme,
	}));

	useEffect(() => {
		changeHTMLAttribute('data-mode', layoutTheme);
	}, [layoutTheme]);

	// get the child view which we would like to render
	const children = props['children'] || null;

	return (
		<>
			<Suspense fallback={loading()}>{children}</Suspense>
		</>
	);
};

export default DefaultLayout;
