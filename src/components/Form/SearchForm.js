import React, {useState, useEffect} from 'react'
import { Form, FormGroup, Label, Button, Card, CardImg } from 'reactstrap'
import { TextField } from '@material-ui/core'
import {Autocomplete, } from '@material-ui/lab'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import axios from 'axios'
import './Form.css'
import logo from '../../logo.png'

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API


const SearchForm = (props) => {
    const [currentStart, setCurrentStart] = useState("")
    const [currentEnd, setCurrentEnd] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [yelpAuto, setYelpAuto] = useState([])
    const [backgroundImages, setBackgroundImages] = useState([])
    const [current, setCurrent] = useState(0)

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
                    <div className="banner">
                        <CardImg className='logo' style={{width: '50%'}} src={logo}/>
                    </div>
                    <FormGroup className='group'>
                        <Label for='startingLocation'> Starting Address </Label>
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
                    </FormGroup>
                    <Button className='button' type="submit">Search</Button>
                </Form>
            </div>
        </div>
    )
};

export default SearchForm;