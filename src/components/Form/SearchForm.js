import React, {useState, useEffect, Image} from 'react'
import { Form, FormGroup, Label, Button, Card, CardImg, CardImgOverlay} from 'reactstrap'
import { TextField, Grid, Box, Fade } from '@material-ui/core'
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
    const [currBgImgFilePath, setCurrBgImgFilePath] = useState("")
    const [onMounted,setMounted] = useState(true)

    useEffect(() => {
        if (window.innerWidth >= 724) {
            const bgImages = importAll(require.context('./images/', false, /\.(png|jpe?g|svg)$/))
            setBackgroundImages(bgImages)
            setCurrBgImgFilePath(bgImages[0]['default'])
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
            }
            {backgroundImages.map((image, index) => (
                <Fade in={index === currBgImgIndx} timeout={imgFadeDuration}>
                    {/* <BackgroundImage image={image['default']}/> */}
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

            <div className='root'>
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
        </Box> 
    )
};

export default SearchForm;