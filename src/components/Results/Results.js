import React, {useRef, useEffect} from 'react'
// import { Container, Row, Col } from 'reactstrap';
import Map from './Map/Map'
import Businesses from './Businesses/Businesses'
import { Grid } from '@material-ui/core';
const section = {
    // height: "100%",
    overflowY: 'auto', 
    height:'500px',
    position: 'relative'
}

// Component mainly to be a container for the maps and businesses
const Results = (props) => {
    return (
        <div>
            <Grid container> {/* left half is the map, right half is the list of businesses */}
                <Grid item xs={6}> 
                    <Map startAddress={props.startAddress} 
                            destination={props.destination}
                            polyline={props.polyline} />
                </Grid>

                <Grid item xs={6} style={section}>
                    <Businesses/>
                </Grid>                
            </Grid>
        </div>
    )
};

export default Results;