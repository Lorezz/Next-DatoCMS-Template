import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const { NEXT_PUBLIC_REACT_APP_API_MAPBOX } = process.env;
const layerUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x`;
const attributionText = `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>;`;

const Map = ({ position, name }) => {
  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url={`${layerUrl}?access_token=${NEXT_PUBLIC_REACT_APP_API_MAPBOX}`}
        attribution={attributionText}
      />
      <Marker position={position} draggable={false} animate={true}>
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
