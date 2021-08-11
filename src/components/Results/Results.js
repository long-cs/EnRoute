import React, {useRef, useEffect, useState} from 'react'
// import { Container, Row, Col } from 'reactstrap';
import Map from './Map/Map'
import Businesses from './Businesses/Businesses'
import { Grid } from '@material-ui/core';

// Component mainly to be a container for the maps and businesses
const Results = (props) => {
    const [polyString, setPolyString] = useState([])
    const [businesses, setBusinesses] = useState([])
    const [height, setHeight] = useState(window.innerHeight)
    const [currID, setCurrID] = useState("here")
    const heightStr = height.toString() + "px"

    useEffect(() => {
        if (props.polyline) {
            setPolyString(props.polyline["_polyline_list"])
            setBusinesses(props.polyline["_buisnesses"])
        }
    }, [props.polyline])

    const changeId = (businessId) => {
        setCurrID(businessId)
    }

    return (
        <div>
            <Grid container> {/* left half is the map, right half is the list of businesses */}
                <Grid item xs={6}>  
                    <Map startAddress={props.startAddress} 
                            destination={props.destination}
                            polyline={polyString}
                            businesses = {businesses}
                            changeId={changeId} 
                            currID = {currID}/>
                </Grid>

                <Grid item xs={6} style={{
                    overflowY: 'auto', 
                    height:heightStr,
                    position: 'relative'
                }}>
                    <Businesses businesses={businesses} changeId={changeId} currID={currID}/>
                </Grid>                
            </Grid>
        </div>
    )
};

export default Results;