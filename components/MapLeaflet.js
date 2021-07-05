import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Map = ({ position, name }) => {
  const layerUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
  const attributionText =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 200, width: 350 }}>
      <TileLayer url={layerUrl} attribution={attributionText} />
      <Marker position={position}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
//USAGE with dynamic import
/*
  const MapWithNoSSR = dynamic(() => import("../component/map"), {ssr: false});
*/
