import React, {useState, useEffect} from 'react'
import { Form, FormGroup, Label, Button, CardImg} from 'reactstrap'
import { TextField, Box, Fade } from '@material-ui/core'
import {Autocomplete, } from '@material-ui/lab'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import axios from 'axios'
import './Form.css'
import logo from '../../logo.png'

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API
const imgFadeDuration = 10000 // 10 seconds

const SearchForm = (props) => {
    const [currentStart, setCurrentStart] = useState("")
    const [currentEnd, setCurrentEnd] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [yelpAuto, setYelpAuto] = useState([])
    const [backgroundImages, setBackgroundImages] = useState([])
    const [currBgImgIndx, setCurrBgImgIndx] = useState(0) // current background image index
    const [onMounted,setMounted] = useState(true)

    useEffect(() => {
        if (window.innerWidth >= 724) {
            const bgImages = importAll(require.context('./images/', false, /\.(png|jpe?g|svg)$/))
            setBackgroundImages(bgImages)
            console.log(bgImages)
        }
    }, [])

    useEffect(() => {        
        const interval = setInterval(() => {
            setCurrBgImgIndx(currBgImgIndx === backgroundImages.length - 1 ? 0: currBgImgIndx + 1);
        }, imgFadeDuration)   

        setMounted(false)
        return () => clearInterval (interval)
    }, [currBgImgIndx, backgroundImages]);

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
        <Box height='100vh' width='100vw'>
            {
                // Load in the first back ground image
            }
            <Fade in={onMounted} appear={false} timeout={imgFadeDuration}>
                <Box 
                    component='img'
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        height: '100vh',
                        width: '100vw',
                        opacity: 0.4,
                        filter: 'blur(2px) brightness(0.7)'
                    }}
                    alt='Background image mising'
                    src={'/static/media/toa-heftiba-W6sqUYlJRiw-unsplash.75089d21.jpg'}>
                </Box>                 
            </Fade>
            { 
                //Background Images
                //Images fade in and out
            }
            {backgroundImages.map((image, index) => (
                <Fade in={index === currBgImgIndx} timeout={imgFadeDuration}>
                    <Box 
                        component='img'
                        sx={{
                            position: 'absolute',
                            display: 'flex',
                            height: '100vh',
                            width: '100vw',
                            opacity: 0.4,
                            filter: 'blur(2px) brightness(0.7)'
                        }}
                        alt='Background image mising'
                        src={image['default']}>
                    </Box>                      
                </Fade>
            ))}   
            
            <Box height='100vh' width='100vw'
                display="flex"
                justifyContent="center"
                alignItems="center" 
                position='relative'>

                <Form className='form' onSubmit={handleSubmit}>
                    <Box display="flex"
                            justifyContent="center"
                            alignItems="center">
                        {
                        //Logo Image 
                        }
                        <CardImg style={{width:'50%',maxWidth:'800px'}} src={logo}/>
                    </Box>                            

                    <FormGroup className='group'>
                        <Label className='labelStyle' for='startingLocation'> Starting Address </Label>
                        <GooglePlacesAutocomplete 
                            apiKey={API_KEY}
                            selectProps={{currentStart, onChange: setCurrentStart,}}
                            withSessionToken={true}
                        />                            
                    </FormGroup>                            

                    <FormGroup className='group'>
                        <Label className='labelStyle' for='destination'> Destination </Label>
                        <GooglePlacesAutocomplete 
                            apiKey={API_KEY}
                            selectProps={{currentEnd, onChange: setCurrentEnd,}}
                            withSessionToken={true}
                        />
                    </FormGroup>                            

                    <FormGroup className='group'>
                        <Label className='labelStyle' for='pointOfInterest' style={{marginBottom: '4px'}}> Point of Interest </Label>
                        <Autocomplete id="searchTerm" freesolo="true" options={yelpAuto}
                        onChange={(e, fullSearchTerm) => setSearchTerm(fullSearchTerm)}
                        onInputChange={(e, newSearchTerm) => handleChangeYelp(newSearchTerm)}
                            renderInput={(params) => <TextField {...params} className="searchTerm"  variant='outlined'/>}
                        />
                    </FormGroup>                            

                    <Button className='button' type="submit">Search</Button>                        
                </Form> 
            </Box>
        </Box> 
    )
};

export default SearchForm;