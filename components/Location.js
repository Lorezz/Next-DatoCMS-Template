import { Box, Text } from '@chakra-ui/react';
import MapBox from './MapMapbox';
const MapLFL = dynamic(() => import('./MapLeaflet'), { ssr: false });
const Map = dynamic(() => import('./MapMix'), { ssr: false });

function Location({ location, detail = false }) {
  if (!location) return null;

  const { id, name, address, kind, position } = location;

  // const position = [{parseFloat(latitude), parseFloat(longitude)];
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  const center = { lng, lat, zoom: 15 };

  const getMap = (kind, props) => {
    let map = null;
    switch (kind) {
      case 'mapbox':
        map = <MapBox {...props} />;
        break;
      case 'leaflet':
        map = <MapLFL {...props} />;
        break;
      default:
        map = <Map {...props} />;
        break;
    }
    return map;
  };

  return (
    <Box marginBottom={6} w="350px">
      <Text>{name}</Text>
      <Text>{address}</Text>
      {getMap(kind, { position: center, name, mapHeight: 250, height: 250 })}
    </Box>
  );
}

export default Location;
