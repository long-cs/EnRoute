// import { ListGroup, ListGroupItem } from 'reactstrap';
import {List, ListItem, ListItemText, Divider, Paper, Container, Box} from '@material-ui/core/';
import './Businesses.css'

const Businesses = (props) => {
    const data = {
        businesses: [
            { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
            { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
            { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
            { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },
            { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
            { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
            { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
            { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },
            { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
            { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
            { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
            { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },                    
            { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
            { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
            { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
            { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },           
             { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
            { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
            { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
            { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },
            { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
            { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
            { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
            { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },
            { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
            { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
            { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
            { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },                    
            { name: 'Lorem ipsum dolor sit', address: 'consectetur adipiscing e' },
            { name: 'as quis laoreet sem. ', address: 'Mauris tempor diam' },
            { name: 'in venenatis felis', address: 'tincidunt nunc id ex porttitor, ut' },
            { name: 'Cras ut tempus', address: 'Vestibulum non lacus' },          
        ]
    }
    // Create a lot of blank loading items, then when the businesses are recieved as aresponse, fill in the item boxes
    return (        
        <div>
                   {/* How to display info, right align?List Item seems really limiting
                        looked at reactstrap and material ui doesnt seem to have exactly what we need 
                        Maybe a list of Cards, but then how to make a list of Cards with max height
                    */}            
            <List component="nav" aria-label="contacts" >
                {data.businesses.map((business) => (
                    <ListItem button> 
                        <ListItemText inset primary={business.name} secondary={business.address}/> 
                    </ListItem>
                ))}
            </List>
        </div>
    )
};

export default Businesses;