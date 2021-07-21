import React from 'react'
import { Form, Input, Button } from 'reactstrap';
import './Searchbar.css'

const Searchbar = () => {
    return (
    // className needs to be taken in as a prop,
    // if already used needs to switch styling from absolute
    <div className='search-bar'>    
        <Form className='form'>
            <Input className='search' placeholder='Search'/>
            <Button className='submit'>Search</Button>
        </Form>
    </div>
    );
};

export default Searchbar;