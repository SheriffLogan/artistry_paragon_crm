import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import { PageBreadcrumb } from '../../../../components';
import { BasicGoogleMap, DarkStyledMap, LightStyledMap, MapWithMarkers, PolyLineMap, StreetViewMap } from './data';

const GoogleMaps = () => {
	return (
		<>
			<PageBreadcrumb title="Google Maps" subName="Maps" />
			<LoadScript googleMapsApiKey="AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA">
				<div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
					<BasicGoogleMap />
					<MapWithMarkers />
					<StreetViewMap />
					<PolyLineMap />
					<LightStyledMap />
					<DarkStyledMap />
				</div>
			</LoadScript>
		</>
	);
};

export default GoogleMaps;
