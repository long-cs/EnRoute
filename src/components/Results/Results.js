import React, {useRef, useEffect, useState} from 'react'
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
    const [polyString, setPolyString] = useState([])
    const [businesses, setBusinesses] = useState([])

    useEffect(() => {
        if (props.polyline) {
            setPolyString(props.polyline["_polyline_list"])
            setBusinesses(props.polyline["_buisnesses"])
        }
    }, [props.polyline])

    return (
        <div>
            <Grid container> {/* left half is the map, right half is the list of businesses */}
                <Grid item xs={6}> 
                    <Map startAddress={props.startAddress} 
                            destination={props.destination}
                            polyline={polyString}
                            businesses = {businesses} />
                </Grid>

                <Grid item xs={6} style={section}>
                    <Businesses businesses={businesses}/>
                </Grid>                
            </Grid>
        </div>
    )
};

export default Results;