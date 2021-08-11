import React, {useState, useEffect, useRef} from 'react';
import { Map, GoogleApiWrapper, Polyline, Marker, InfoWindow } from 'google-maps-react';
import { Typography} from '@material-ui/core';
import polyline from "polyline"
import './Map.css'
import {Button} from 'reactstrap'

const mapStyles = {
  width: '50%',
  height: '100%',
  borderRadius: '10px',
  marginLeft: '10px',
  marginTop: '8px',
};

// const smallMapStyles = {
//   width: '100%',
//   height: '20%',
//   borderRadius: '10px',
//   marginLeft: '10px',
//   marginTop: '8px',
// };

const Maps = (props) => {
  const mapRef = useRef(null)
  const [state, setState] = useState({
    activeMarker: {},
    seletctedPlace: {},
    showingInfoWindow: false
  })
  const [styles, setStyles] = useState(mapStyles)
  const [width, setWidth] = useState(window.innerWidth)
  


  const onMarkerClick = (props, marker) => {
    setState({
      activeMarker: marker,
      seletctedPlace: props,
      showingInfoWindow: true
    })
    setCenter(props.position)
  }

  const onInfoWindowClose = () => {
    setState({
      activeMarker: null,
      showingInfoWindow: false
    })
  }

  const onMapClicked = () => {
    if (state.showingInfoWindow) {
      setState({
        activeMarker: null,
        showingInfoWindow: false
      })
    } 
  }

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

  const [center, setCenter] = useState(fullCoords[0])
  // for loop the polty

  return (
      <div  ref={mapRef}>
      {
        // console.log("polystring", polyString)
      }
      <Map
          google = {props.google}
          
          style={ 
            mapStyles
          }
          initialCenter = {center}
          onClick={onMapClicked}
          bounds={ bounds }
          // zoom={11}
          >
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
          >
          </Marker>
          {props.businesses.map((waypoint) => (
              waypoint.businesses.map ((business) => (
              (business.id === props.currID) ? (
                <Marker
                  title={business.name}
                  name = {business.name}
                  photo={business.image_url}
                  key = {business.id}
                  url = {business.url}
                  icon={{url:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                  onClick={onMarkerClick}
                  position={{"lat":business.coordinates.latitude, "lng":business.coordinates.longitude}}
                />) :
                <Marker
                  title={business.name}
                  name = {business.name}
                  photo={business.image_url}
                  key = {business.id}
                  url = {business.url}
                  onClick={onMarkerClick}
                  position={{"lat":business.coordinates.latitude, "lng":business.coordinates.longitude}}
                />
            )))
          )}
          <InfoWindow
              marker={state.activeMarker}
              onClose={onInfoWindowClose}
              visible={state.showingInfoWindow}>
              {state.seletctedPlace ? 
                <div>
                  <img src={state.seletctedPlace.photo} className="photo" alt={state.seletctedPlace.name}/>
                  <Typography variant="subtitle1" color="textPrimary">{state.seletctedPlace.name}</Typography>
                  <Button color="danger" size="sm" active href={state.seletctedPlace.url} targer="_blank">Yelp</Button>
                  {/*  */}
                </div>: <p></p>}
            </InfoWindow>
      </Map>
      </div>
  )
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
  })(Maps)