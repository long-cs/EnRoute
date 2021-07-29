import React, {useState, useEffect} from 'react';
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react';
import axios from 'axios';
import polyline from "polyline"
import './Map.css'

const Maps = (props) => {
    const mapStyles = {
        width: '30%',
        height: '60%',
        marginLeft: '4%',
        marginTop: '4em',
    };
    const [polyString, setPolyString] = useState([])
    const [polylineCoord, setPolylineCoord] = useState([])


    useEffect(() => {
      if (props.polyline) {
        setPolyString(props.polyline["_polyline_list"])
      }
    }, [props.polyline])

    let fullCoords = []
    var bounds = new props.google.maps.LatLngBounds()
    for (let i = 0; i < polyString.length; i++) {
      let directionCoords = polyline.decode(polyString[i])
      const pathList = []
      for (let j = 0; j < directionCoords.length; j++) {
        const coord = {
          "lat": directionCoords[j][0],
          "lng": directionCoords[j][1]
        }
        pathList.push(coord)
        bounds.extend(coord)
      }
      fullCoords = fullCoords.concat(pathList) 
    }
    console.log(fullCoords)
    // for loop the polty

    return (
        <div className='map'>
        {
          console.log(props.polyline)
          // console.log("polystring", polyString)
        }
        <Map
            google = {props.google}
            style={mapStyles}
            initialCenter = {fullCoords[0]}
            bounds={bounds}>
            <Marker
              title = {props.startAddress}
              name = {props.startAddress}
              position = {fullCoords[0]}
            />
            <Polyline
              path={fullCoords}
              strokeColor="#709DFF"
              strokeOpacity={2}
              strokeWeight={4}/>
            <Marker
              title = {props.destination}
              name = {props.destination}
              position = {fullCoords[fullCoords.length - 1]}
            />
        </Map>
        </div>
    )
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCEUcLAhX6U6pxYlcXrMkuL5XoLyd_Nfck'
  })(Maps)