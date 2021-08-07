import React, {useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { TextField } from '@material-ui/core'
import {Autocomplete, } from '@material-ui/lab'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import axios from 'axios'
import './Form.css'


const SearchForm = (props) => {
    const [currentStart, setCurrentStart] = useState("")
    const [currentEnd, setCurrentEnd] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [yelpAuto, setYelpAuto] = useState([])


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
        <div className='root'>
            <Form className='form' onSubmit={handleSubmit}>
                <FormGroup className='group'>
                    <Label for='startingLocation'> Starting Address </Label>
                    {/* <Input type='address' value={currentStart} onChange={(e) => {setCurrentStart(e.target.value)}}/> */}
                    {/* autocomplete calls the api too much, session not working*/}
                    <GooglePlacesAutocomplete 
                        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
                        selectProps={{currentStart, onChange: setCurrentStart,}}
                        withSessionToken='true'    
                    />
                </FormGroup>
                <FormGroup className='group'>
                    <Label for='destination'> Destination </Label>
                    <GooglePlacesAutocomplete 
                        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
                        selectProps={{currentEnd, onChange: setCurrentEnd,}}
                        withSessionToken='true'      
                    />
                </FormGroup>
                <FormGroup className='group'>
                    <Label for='pointOfInterest'> Point of Interest </Label>
                    <Autocomplete id="searchTerm" freesolo="true" options={yelpAuto}
                    onChange={(e, fullSearchTerm) => setSearchTerm(fullSearchTerm)}
                    onInputChange={(e, newSearchTerm) => handleChangeYelp(newSearchTerm)}
                        renderInput={(params) => <TextField {...params} className="searchTerm" variant='outlined'/>}
                    />
                     {/* <Input type='interests' onChange={(e) => setSearchTerm(e.target.value)}/> */}
                    
                </FormGroup>
                <Button className='button' type="submit">Search</Button>
            </Form>
        </div>
    )
};

export default SearchForm;