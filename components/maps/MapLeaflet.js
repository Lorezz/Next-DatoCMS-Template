import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const Map = ({ position, name }) => {
  const layerUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
  const attributionText =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
       style={{ height: '100%', width: '100%' }}>
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
