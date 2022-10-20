import React, {useState, useEffect, useRef, useMemo} from 'react';
import { Map, GoogleApiWrapper, Polyline, Marker, InfoWindow, LatLng} from 'google-maps-react';
import { Typography} from '@material-ui/core';
import polyline from "polyline"
import './Map.css'
import {Button} from 'reactstrap'
import MapMarker from './MapMarker'
const mapStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  marginLeft: '10px',
  marginTop: '8px',
};

const smallMapStyles = {
  width: '100%',
  height: '40%',
  borderRadius: '10px',
  marginLeft: '10px',
  marginTop: '8px',
  marginBottom: '10em',
  position: 'relative'
};

const Maps = (props) => {
  const mapRef = useRef(null)
  const [state, setState] = useState({
    activeMarker: {},
    seletctedPlace: {},
    showingInfoWindow: false
  })
  const [styles, setStyles] = useState(window.innerWidth >= 640 ? mapStyles : smallMapStyles)
  const [fullCoords,setFullCoords] = useState([])
  const [bounds, setBounds] = useState(null)
  const [center, setCenter] = useState(fullCoords[0]) 

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
    // mapRef.current.scrollIntoView()

    let fullCoordsArr = []
    var boundsGoogle = new props.google.maps.LatLngBounds()

    if(!props.reset)  {
      for (let i = 0; i < props.polyline.length; i++) {
      let directionCoords = polyline.decode(props.polyline[i])
      const pathList = []
      for (let j = 0; j < directionCoords.length; j++) {
        const coord = {
          "lat": directionCoords[j][0],
          "lng": directionCoords[j][1]
        }
        pathList.push(coord)
        boundsGoogle.extend(coord)
      }
      fullCoordsArr = fullCoordsArr.concat(pathList)
    }
  }

  var centerLatLng = boundsGoogle.getCenter()

  // set state on first mounted
  setFullCoords(fullCoordsArr)
  setBounds(boundsGoogle)
  setCenter(centerLatLng)

    }, [props.google.maps.LatLngBounds, props.polyline,props.reset])

  // for loop the polty
  // use Memo will only rerender the map if the dependancy props in the array have been changed
  return useMemo( () =>
      <div  ref={mapRef}>
      {/* {
        console.log("polystring", polyString)
      } */}
        <Map
            google = {props.google}
            
            style={ 
              styles
            }
            // setting center doesnt seem to affect anything? setting bounds is what moves the map
            center = {center}
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
            />

            {props.businesses.map((waypoint) => (
                waypoint.businesses.map ((business) => (
                  <MapMarker
                  title={business.name}
                  name = {business.name}
                  photo={business.image_url}
                  key = {business.id}
                  url = {business.url}
                  onClick={onMarkerClick}
                  position={{"lat":business.coordinates.latitude, "lng":business.coordinates.longitude}}
                  icon={business.id === props.currID ? {url:"https://maps.google.com/mapfiles/ms/icons/blue-dot.png" }: undefined}
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
                  </div>: <p></p>}
              </InfoWindow>          
        </Map>
      </div>
  ,[ center, bounds, props.startAddress, props.destination, props.polyline, props.businesses, props.currID,props.reset]) // only rerender when these props has changed
};

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API })(Maps)