import React, {useEffect, useState, useRef} from 'react'
import Map from './Map/Map'
import Businesses from './Businesses/Businesses'
import { Grid, CircularProgress, Box } from '@material-ui/core';
// sets a limit that the function that's passed in is limited to execute every x ms
// used when resizing Height for Businesses. Resizing for every single pixel lags the browser a bit
function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }
// Component mainly to be a container for the maps and businesses
const Results = (props) => {
    const [height, setHeight] = useState(window.innerHeight)
    const [polyString, setPolyString] = useState([])
    const [businesses, setBusinesses] = useState([])
    const [currID, setCurrID] = useState("here")
    const heightStr = height.toString() + "px"
    const endRef = useRef(null);

    useEffect(() => {
        if (props.polyline) {
            setPolyString(props.polyline["_polyline_list"])
            setBusinesses(props.polyline["_businesses"])
        }

        // resizes the height of Businesses every 100ms
        const debouncedHandleResize = debounce(function handleResize() {
            setHeight(window.innerHeight)
            // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
          }, 100) //100 ms

        window.addEventListener('resize', debouncedHandleResize) // listen to window resize

        endRef.current.scrollIntoView({ behavior: "smooth" });

        return function cleanUp() {
             // remove window listener
             // If we did not remove listener, then everytime React redraws, it will add another listener
             // causing it to have hundreds/thousands of listeners if they are never removed
            window.removeEventListener('resize', debouncedHandleResize)
        }
    }, [props.polyline])

    const changeId = (businessId) => {        
        setCurrID(businessId)
    }
    
    return (
        <div>
            <div>
                {window.innerWidth >= 640 ?
                <div>
                    <Grid container> {/* right half is the map, left half is the list of businesses */}                        
                        <Grid item xs={6} style={{
                                overflowY: 'auto', 
                                height:heightStr,
                                position: 'relative'
                            }}>                                
                            <Businesses businesses={businesses} 
                                        changeId={changeId} 
                                        currID={currID}
                                        reset={props.reset}
                                        winHeightPx={heightStr}
                                        />
                        </Grid>
                        <Grid item xs={6} 
                            style={{
                                position: 'relative'
                            }}>   
                            <Map startAddress={props.startAddress} 
                                    destination={props.destination}
                                    polyline={polyString}
                                    businesses = {businesses}
                                    changeId={changeId} 
                                    currID = {currID}
                                    reset = {props.reset}
                                    />
                        </Grid>
                    </Grid>
                </div> :
                <div>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        <div style={{marginBottom: '18em'}}>
                        <Map tartAddress={props.startAddress} 
                            destination={props.destination}
                            polyline={polyString}
                            businesses = {businesses}
                            changeId={changeId} 
                            currID = {currID}
                            reset = {props.reset}                            
                            />
                        </div>
                        <div style={{
                                    overflowY: 'auto', 
                                    height:600,
                                    }}>
                        <Businesses className = "businesses"
                                    businesses={businesses} 
                                    changeId={changeId} 
                                    currID={currID}
                                    reset={props.reset}
                                    winHeightPx={heightStr}
                        />
                        </div>
                    </div>
                </div>
                }
            </div>
            <div ref={endRef} />
        </div>
    )
};

export default Results;