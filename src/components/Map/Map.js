import React, {useState} from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './Map.css'

const Maps = (props) => {
    const mapStyles = {
        width: '30%',
        height: '60%',
        marginLeft: '4%',
        marginTop: '4em',
    };

    return (
        <div className='map'>
        <Map
            google = {props.google}
            zoom = {15}
            style={mapStyles}
            initialCenter = {{lat: 34.065317, lng: -118.202242}}
        />
        </div>
    )
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCEUcLAhX6U6pxYlcXrMkuL5XoLyd_Nfck'
  })(Maps)