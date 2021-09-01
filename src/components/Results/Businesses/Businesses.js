import React from 'react';
import {List, CircularProgress, Box, Card, CardContent, Typography} from '@material-ui/core/';
import {Rating} from '@material-ui/lab'
import './Businesses.css'



const Businesses = (props) => {
    return (
        <div>
            {/* When business length is 0 show loading circle, else show list component */}
            {props.businesses.length === 0 ?
                <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh">
                    <CircularProgress/>
                </Box>            
            :
            <List component="nav" aria-label="contacts" >
                {props.businesses.map((waypoint) => (
                    waypoint.businesses.map ((business) => (
                        <Card className="business" onClick={() => {
                            window.open(business.url)
                        }}
                        onMouseOver={()=>{
                            if (props.currID !== business.id) {
                                props.changeId(business.id)
                            }
                        }}
                        key={business.id}
                        >
                            <img
                                className="photo"
                                src = {business.image_url}
                                alt = {business.name}
                            />
                            <CardContent className="content">
                                <Typography component="h5" variant="h5">{business.name}</Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {business.location.display_address[0]}, {business.location.display_address[1]} 
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">{business.categories[0].title}{business.categories.slice(1).map((category) => `, ${category.title}`)}</Typography>
                                <div className="rating" 
                                // rating doesnt update
                                >
                                <Rating name="reviews" defaultValue={business.rating} precision={0.5} readOnly/>
                                <Typography variant="subtitle1" color="textSecondary" style={{margin: '0px 8px'}}>{business.review_count} reviews</Typography>
                                <Typography variant="subtitle1" color="textSecondary">{business.price}</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ))}
            </List>            
            }            
        </div>
    )
};

export default Businesses;