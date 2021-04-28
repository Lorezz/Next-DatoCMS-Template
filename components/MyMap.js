import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Map = ({ position, name }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 200, width: 350 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
