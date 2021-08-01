// import { ListGroup, ListGroupItem } from 'reactstrap';
import React, {useState, useEffect} from 'react';
import {List, ListItem, ListItemText, Divider, Paper, Container, Box, Card, CardMedia, CardContent} from '@material-ui/core/';
import './Businesses.css'

const Businesses = (props) => {
    // const data = {
    //     businesses: [
    //         { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
    //         { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
    //         { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
    //         { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },
    //         { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
    //         { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
    //         { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
    //         { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },
    //         { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
    //         { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
    //         { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
    //         { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },                    
    //         { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
    //         { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
    //         { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
    //         { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },           
    //          { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
    //         { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
    //         { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
    //         { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },
    //         { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
    //         { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
    //         { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
    //         { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },
    //         { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
    //         { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
    //         { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
    //         { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },                    
    //         { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
    //         { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
    //         { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
    //         { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },          
    //     ]
    // }

    const [data, setData] = useState([])

    // Create a lot of blank loading items, then when the businesses are recieved as aresponse, fill in the item boxes
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
                        <ListItem button> 
                           <ListItemText inset primary={business.name} secondary={business.location.display_address}/> 
                         </ListItem>
                        // <Card>
                        //     <CardContent>
                        //         <h2>{business.name}</h2>
                        //         <h2>{business.location.display_address}</h2>
                        //         <img src = {business.image_url}/>
                        //     </CardContent>
                        // </Card>
                    ))
                ))}
            </List>
        </div>
    )
};

export default Businesses;