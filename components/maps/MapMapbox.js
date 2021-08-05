import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import mapboxgl from 'mapbox-gl';

const { NEXT_PUBLIC_REACT_APP_API_MAPBOX } = process.env;

const Map = ({ mapHeight, position }) => {
  var map;
  mapboxgl.accessToken = NEXT_PUBLIC_REACT_APP_API_MAPBOX;
  const mapRef = useRef(null);

  const initialValues = position ? position : { lng: 0.0, lat: 0.0, zoom: 14 };
  const [opts, setOpts] = useState(initialValues);

  useEffect(() => {
    try {
      map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [opts.lng, opts.lat],
        zoom: opts.zoom
      });
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

      new mapboxgl.Marker().setLngLat([opts.lng, opts.lat]).addTo(map);

      return () => map.remove();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: mapHeight ? mapHeight : 500,
          border: '1px solid #eee',
          backgroundColor: '#eee',
          borderRadius: '10px'
        }}>
        <div
          ref={mapRef}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
          }}></div>
      </div>
    </div>
  );
};
export default Map;

/*
ADD MAPBOX TO HEAD BEFORE USE THE COMPONENT FOR EXAMPLE IN A HOC OR IN A PAGE.
  <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
*/
