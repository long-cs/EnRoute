import React, {useRef, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap';
import Map from './Map/Map'
import Businesses from './Businesses/Businesses'

// Component mainly to be a container for the maps and businesses
const Results = (props) => {
    const resultsRef = useRef(null)
    useEffect(() => {
        // when first mounted, scoll to results
        resultsRef.current.scrollIntoView()
        }, [])

    return (
        <div ref={resultsRef}>
            <Container>
                <Row>
                    <Col>
                        <Map startAddress={props.startAddress} 
                            destination={props.destination} 
                            polyline={props.polyline}/> 
                    </Col>
                    <Col>
                        <Businesses/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Results;