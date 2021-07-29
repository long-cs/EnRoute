import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import './Form.css'

const CustomForm = ({setStartAddress, setDestination}) => {
    const [currentStart, setCurrentStart] = useState("")
    const [currentEnd, setCurrentEnd] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setStartAddress(currentStart)
        setDestination(currentEnd)
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
                    <Input type='interests'/>
                </FormGroup>
                <Button className='button' type="submit">Search</Button>
            </Form>
        </div>
    )
};

export default CustomForm;