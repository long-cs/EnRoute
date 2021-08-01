import React, {useState, useEffect, useRef} from 'react';
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react';
import polyline from "polyline"
import './Map.css'

const mapStyles = {
  width: '50%',
  height: '100%',
};

const Maps = (props) => {
  const mapRef = useRef(null)
  
  useEffect(() => {
      // when first mounted, scoll to results
      mapRef.current.scrollIntoView()
      }, [])

  let fullCoords = []
  var bounds = new props.google.maps.LatLngBounds()
  for (let i = 0; i < props.polyline.length; i++) {
    let directionCoords = polyline.decode(props.polyline[i])
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
  // for loop the polty

  return (
      <div className='map' ref={mapRef}>
      {
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