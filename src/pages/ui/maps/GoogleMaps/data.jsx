import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Polyline, StreetViewPanorama } from '@react-google-maps/api';
import { PageBreadcrumb } from '../../../../components';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const polylinePath = [
  { lat: 37.789411, lng: -122.422116 },
  { lat: 37.785757, lng: -122.421333 },
  { lat: 37.789352, lng: -122.415346 },
];

const BasicGoogleMap = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Basic Example</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="gmaps-basic" className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: -12.043333, lng: -77.028333 }}
                zoom={8}
                options={{
                  zoomControlOptions: {
                    position: window.google.maps.ControlPosition.LEFT_TOP,
                  },
                }}
              ></GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapWithMarkers = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  const onBasicMarkerClick = () => {
    alert('You clicked in this marker');
  };

  const onMarkerClick = (marker, props) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
    setShowingInfoWindow(true);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Markers Google Map</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="gmaps-markers" className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: 21.569874, lng: 71.5893798 }}
                zoom={18}
                options={{
                  zoomControlOptions: {
                    position: window.google.maps.ControlPosition.LEFT_TOP,
                  },
                }}
              >
                <Marker
                  title={'This is sweet home.'}
                  name={'Home sweet home!'}
                  position={{ lat: 21.569874, lng: 71.5893798 }}
                  onClick={onBasicMarkerClick}
                ></Marker>

                <Marker
                  name="Current location"
                  title={'Marker with InfoWindow'}
                  position={{ lat: 21.56969, lng: 71.5893798 }}
                  onClick={(props, marker) => onMarkerClick(marker, props)}
                ></Marker>
                {showingInfoWindow && (
                  <InfoWindow
                    position={activeMarker.getPosition()}
                    onCloseClick={onInfoWindowClose}
                  >
                    <div>
                      <p>{selectedPlace.name}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

const StreetViewMap = () => {
  const mapRef = useRef(null);

  const activateStreetView = (position) => {
    if (mapRef.current) {
      const mapObj = mapRef.current.getStreetView();
      mapObj.setPov({ heading: 34, pitch: 10 });
      mapObj.setPosition(position);
      mapObj.setVisible(true);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Street View Panoramas Google Map</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="panorama" className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: 40.7295174, lng: -73.9986496 }}
                zoom={14}
                onLoad={(map) => (mapRef.current = map)}
                onReady={() => {
                  activateStreetView({ lat: 40.7295174, lng: -73.9986496 });
                }}
              >
                <StreetViewPanorama
                  position={{ lat: 40.7295174, lng: -73.9986496 }}
                  visible={true}
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

const PolyLineMap = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Google Map Types</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="gmaps-types" className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: 37.789411, lng: -122.422116 }}
                zoom={14}
                options={{
                  zoomControlOptions: {
                    position: window.google.maps.ControlPosition.LEFT_TOP,
                  },
                }}
              >
                <Polyline
                  path={polylinePath}
                  options={{
                    fillColor: '#0000FF',
                    fillOpacity: 0.35,
                    strokeColor: '#0000FF',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

const LightStyledMap = () => {
  const mapStyles = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }, { lightness: 17 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 18 }],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 16 }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 21 }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#dedede' }, { lightness: 21 }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }],
    },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#f2f2f2' }, { lightness: 19 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [{ color: '#fefefe' }, { lightness: 20 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }],
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Ultra Light With Labels</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="ultra-light" className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: -12.043333, lng: -77.028333 }}
                zoom={10}
                options={{
                  styles: mapStyles,
                  zoomControlOptions: {
                    position: window.google.maps.ControlPosition.LEFT_TOP,
                  },
                }}
              ></GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

const DarkStyledMap = () => {
  const mapStyles = [
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ saturation: 36 }, { color: '#000000' }, { lightness: 40 }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#000000' }, { lightness: 16 }],
    },
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000000' }, { lightness: 20 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#000000' }, { lightness: 17 }, { weight: 1.2 }],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#e5c163' }],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#c4c4c4' }],
    },
    {
      featureType: 'administrative.neighborhood',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#e5c163' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 20 }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 21 }, { visibility: 'on' }],
    },
    {
      featureType: 'poi.business',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#e5c163' }, { lightness: '0' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#e5c163' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 18 }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.fill',
      stylers: [{ color: '#575757' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#2c2c2c' }],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 16 }],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#999999' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 19 }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 17 }],
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Dark</h4>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div id="dark" className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: -12.043333, lng: -77.028333 }}
                zoom={10}
                options={{
                  styles: mapStyles,
                  zoomControlOptions: {
                    position: window.google.maps.ControlPosition.LEFT_TOP,
                  },
                }}
              ></GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BasicGoogleMap, DarkStyledMap, MapWithMarkers, StreetViewMap, PolyLineMap, LightStyledMap };
