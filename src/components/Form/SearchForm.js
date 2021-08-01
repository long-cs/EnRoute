import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import './Form.css'

const SearchForm = (props) => {
    const [currentStart, setCurrentStart] = useState("")
    const [currentEnd, setCurrentEnd] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSearch(currentStart,currentEnd,searchTerm)
    }

    return (
        <div className='root'>
            <Form className='form' onSubmit={handleSubmit}>
                <FormGroup className='group'>
                    <Label for='startingLocation'> Starting Address </Label>
                    <Input type='address' onChange={(e) => setCurrentStart(e.target.value)}/>
                </FormGroup>
                <FormGroup className='group'>
                    <Label for='destination'> Destination </Label>
                    <Input type='address' onChange={(e) => setCurrentEnd(e.target.value)}/>
                </FormGroup>
                <FormGroup className='group'>
                    <Label for='pointOfInterest'> Point of Interest </Label>
                    <Input type='interests' onChange={(e) => setSearchTerm(e.target.value)}/>
                </FormGroup>
                <Button className='button' type="submit">Search</Button>
            </Form>
        </div>
    )
};

export default SearchForm;