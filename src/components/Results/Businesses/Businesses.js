// import { ListGroup, ListGroupItem } from 'reactstrap';
import React, {useState, useEffect} from 'react';
import {List, ListItem, ListItemText, Divider, Paper, Container, Box, Card, CardContent, CardMedia, Typography, CardActionArea} from '@material-ui/core/';
import {Rating} from '@material-ui/lab'
import {CardImg} from "reactstrap";
import './Businesses.css'

const Businesses = (props) => {
    // const [currID, setCurrID] = useState("")
    return (
        <div>
                   {/* How to display info, right align?List Item seems really limiting
                        looked at reactstrap and material ui doesnt seem to have exactly what we need 
                        Maybe a list of Cards, but then how to make a list of Cards with max height
                    */}

                    {/* You can replace ListItem with any tag like Card and you'll still get a vertical list
                        of objects
                        I'd use yelp or the meetways ui design as a reference when designing the list of cards
                    */}               
            <List component="nav" aria-label="contacts" >
                {props.businesses.map((waypoint) => (
                    waypoint.businesses.map ((business) => (
                        <Card className="business" onClick={() => {
                            window.open(business.url)
                        }}
                        onMouseOver={()=>{
                            if (props.currID !== business.id) {
                                props.changeId(business.id)
                                // console.log(business.id)
                            }
                        }}
                        key={business.id}
                        // onMouseOut={()=>{
                        //     props.changeId("")
                        // }}
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
                                <div className="rating">
                                    {/* rating doesnt update */}
                                <Rating name="reviews" defaultValue={business.rating} precision={0.5} readOnly/>
                                <Typography variant="subtitle1" color="textSecondary" style={{margin: '0px 8px'}}>{business.review_count} reviews</Typography>
                                <Typography variant="subtitle1" color="textSecondary">{business.price}</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ))}
            </List>
        </div>
    )
};

export default Businesses;