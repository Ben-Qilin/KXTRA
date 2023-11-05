import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 48.856614,
      lng: 2.3522219
    },
    zoom: 12
  };

  return (
    // Important! Always set the container height explicitly,,,,,box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    <div style={{ height: '100%', width: '100%', borderRadius: '1Rem', overflow: 'hidden' , boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', border: '2px solid gray', backgroundColor: 'gray' , opacity: '100%', backdropFilter: 'blur(30px)' }}>
      <GoogleMapReact
      
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}