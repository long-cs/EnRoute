import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import './Form.css'

const CustomForm = () => {
    return (
        <div className='root'>
            <Form className='form'>
                <FormGroup className='group'>
                    <Label for='startingLocation'> Starting Address </Label>
                    <Input type='address'/>
                </FormGroup>
                <FormGroup className='group'>
                    <Label for='destination'> Destination </Label>
                    <Input type='address'/>
                </FormGroup>
                <FormGroup className='group'>
                    <Label for='pointOfInterest'> Point of Interest </Label>
                    <Input type='interests'/>
                </FormGroup>
                <Button className='button'>Search</Button>
            </Form>
        </div>
    )
};

export default CustomForm;