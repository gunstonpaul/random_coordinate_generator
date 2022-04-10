import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { conf } from './config';
import React, { useState } from 'react';
const axios = require('axios');


const MapboxMap = ReactMapboxGl({
  accessToken: conf.mapAccessToken,
});

export default function App() {

    const [state, setState] = useState([[0,0],[0,0],[0,0],[0,0],[0,0]]);
    const getCoordinates =  function (features)  {
        const boundary = features[0].geometry.coordinates;
         axios
        .get('http://localhost', 
        {
          params: {boundary }
        }
        )
        .then(res => {
            document.getElementById('coordinates1').innerHTML = `Random Coordinate: 1: ${JSON.stringify(res.data[0])}`;
            document.getElementById('coordinates2').innerHTML = `Random Coordinate: 2: ${JSON.stringify(res.data[1])}`;
            document.getElementById('coordinates3').innerHTML = `Random Coordinate: 3: ${JSON.stringify(res.data[2])}`;
            document.getElementById('coordinates4').innerHTML = `Random Coordinate: 4: ${JSON.stringify(res.data[3])}`;
            document.getElementById('coordinates5').innerHTML = `Random Coordinate: 5: ${JSON.stringify(res.data[4])}`;
            setState([[res.data[0]],[res.data[1]],[res.data[2]],[res.data[3]],[res.data[4]]])
        

        })
        .catch(error => {
          console.error(error)
        })
      }
    const onDrawCreate = async ({ features }) => {
        getCoordinates(features);
    };

    return (
        <MapboxMap
        style="mapbox://styles/mapbox/streets-v8"
        zomm={0}
        containerStyle={{
        height: '400px',
        width: '400px'
        }}
        center = {[151.268356, -23.843138]}
    >
        <DrawControl controls={{combine_features: false, uncombine_features: false, point: false, line_string:false}} onDrawCreate={onDrawCreate}/>
        <Layer
        type="symbol"
        id="marker0"
        layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={state[0]}/> 
        </Layer>
        <Layer
        type="symbol"
        id="marker1"
        layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={state[1]}/> 
        </Layer>
        <Layer
        type="symbol"
        id="marker3"
        layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={state[2]}/> 
        </Layer>
        <Layer
        type="symbol"
        id="marker3"
        layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={state[3]}/> 
        </Layer>
        <Layer
        type="symbol"
        id="marker4"
        layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={state[4]}/> 
        </Layer>
    </MapboxMap>
    );
}



