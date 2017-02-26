import React, { Component, PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div><img src="/map-marker-icon.png" width="20px" height="20px" /></div>;

const defaultProps = {
  center: {lat: 34.7472472, lng: -86.5817218},
  zoom: 13
};

const MapContainer = ({ chatLogs }) => (
  <GoogleMapReact
    defaultCenter={defaultProps.center}
    defaultZoom={defaultProps.zoom}
  >
    {chatLogs.map(chatLog => {
      if (!chatLog.latitude || !chatLog.longitude) {
        return;
      }
      return (
      <AnyReactComponent
        lat={chatLog.latitude}
        lng={chatLog.longitude}
        text={chatLog.priority}
      />
      );
    }
  )}
  </GoogleMapReact>
);

MapContainer.propTypes = {
  chatLogs: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    caseNumber: PropTypes.number.isRequired,
    priority: PropTypes.string.isRequired,
    lastMessage: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  })).isRequired,
};


export default MapContainer;
