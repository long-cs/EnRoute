import React, {useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, Card, CardImg } from 'reactstrap'
import { TextField } from '@material-ui/core'
import {Autocomplete, } from '@material-ui/lab'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import axios from 'axios'
import './Form.css'

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API


const SearchForm = (props) => {
    const [currentStart, setCurrentStart] = useState("")
    const [currentEnd, setCurrentEnd] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [yelpAuto, setYelpAuto] = useState([])
    const [backgroundImages, setBackgroundImages] = useState([])
    const [current, setCurrent] = useState(0)
    // const [addresses, setAddresses] = useState([])
    // const [sessionToken, setSessionToken] = useState('')

    useEffect(() => {
        if (window.innerWidth >= 724) {
        setBackgroundImages(importAll(require.context('./images/', false, /\.(png|jpe?g|svg)$/)))
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current === backgroundImages.length - 1 ? 0: current + 1);
        }, 180000)
        return () => clearInterval (interval)
    }, [current, backgroundImages]);

    function importAll(r) {
        return r.keys().map(r);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSearch(currentStart.label,currentEnd.label,searchTerm)
    }

    const handleChangeYelp = (newSearchTerm) => {
        if (newSearchTerm !== "") {         
            axios
                .get(`/s/autocomplete?text=${newSearchTerm}&type=yelp`)
                .then((res) => {setYelpAuto(res.data)})
                .catch((err) => console.log(err))
            setSearchTerm(newSearchTerm)   
        }
    }

    return (
        <div>
            <div className="slider">
                {
                backgroundImages.map((image, index) => (
                    <Card className={index === current ? "active": "notActive"} key = {index}>
                        {index === current && (<CardImg src={image["default"]} className={"background_photo"}/>)}
                    </Card>))}   
            </div>
            <div className='root'>
                <Form className='form' onSubmit={handleSubmit}>
                    <FormGroup className='group'>
                        <Label for='startingLocation'> Starting Address </Label>
                        {/* <Input type='address' value={currentStart} onChange={(e) => {setCurrentStart(e.target.value)}}/> */}
                        {/* autocomplete calls the api too much, session not working*/}
                        <GooglePlacesAutocomplete 
                            apiKey={API_KEY}
                            selectProps={{currentStart, onChange: setCurrentStart,}}
                            withSessionToken={true}
                        />
                    </FormGroup>
                    <FormGroup className='group'>
                        <Label for='destination'> Destination </Label>
                        <GooglePlacesAutocomplete 
                            apiKey={API_KEY}
                            selectProps={{currentEnd, onChange: setCurrentEnd,}}
                            withSessionToken={true}
                        />
                    </FormGroup>
                    <FormGroup className='group'>
                        <Label for='pointOfInterest' style={{marginBottom: '4px'}}> Point of Interest </Label>
                        <Autocomplete id="searchTerm" freesolo="true" options={yelpAuto}
                        onChange={(e, fullSearchTerm) => setSearchTerm(fullSearchTerm)}
                        onInputChange={(e, newSearchTerm) => handleChangeYelp(newSearchTerm)}
                            renderInput={(params) => <TextField {...params} className="searchTerm"  variant='outlined'/>}
                        />
                        {/* <Input type='interests' onChange={(e) => setSearchTerm(e.target.value)}/> */}
                        
                    </FormGroup>
                    <Button className='button' type="submit">Search</Button>
                </Form>
            </div>
        </div>
    )
};

export default SearchForm;