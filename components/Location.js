import { useState } from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';
import Map from './Map';

function Location({ location, detail = false }) {
  if (!location) return null;
  const [showMap, setShowMap] = useState(detail);

  const {
    id,
    name,
    address,
    kind,
    placeId,
    iconUrl,
    latitude,
    longitude
  } = location;

  // const position = [{parseFloat(latitude), parseFloat(longitude)];

  if (!(latitude && longitude)) return null;

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  const position = { lng, lat, zoom: 15 };
  return (
    <Box marginBottom={6} w="350px">
      {iconUrl && <Image src={iconUrl} w={'24px'} alt={name} />}
      <Text>{name}</Text>
      <Text>{address}</Text>
      {showMap && <Map mapHeight={250} position={position} name={name} />}
      <Button size="sm" onClick={() => setShowMap(!showMap)}>
        map
      </Button>
    </Box>
  );
}

export default Location;
