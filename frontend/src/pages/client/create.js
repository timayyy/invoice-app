import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../components/message'
import { Loader } from '../../components/loader'
import { FormContainer } from '../../components/form-container'
import { createClient } from '../../redux/client/client.actions'
import { CLIENT_CREATE_RESET } from '../../redux/client/client.constants'

const ClientCreatePage = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')

    const dispatch = useDispatch()

    const clientCreate = useSelector((state) => state.clientCreate)
    const {
        loading,
        error,
        success,
    } = clientCreate

    useEffect(() => {
        if (success) {
            dispatch({ type: CLIENT_CREATE_RESET })
            history.push('/client')
        }
    }, [dispatch, history, success])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(name, email, address, city, zipCode, country);
        dispatch(
            createClient({
                name,
                email,
                streetAddress: address,
                city,
                zipCode,
                country
            })
        )
    }
    return (
        <>
            <Link to='/client' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Create Client</h1>
                <hr />
                {error && <Message variant='danger'>{error}</Message>}
                {loading ? (
                    <Loader />
                ) : (
                    <Form onSubmit={submitHandler}>
                        <div className="mt-2 mb-5">
                            <Form.Group className="mt-2" controlId='name'>
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Client Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mt-2" controlId='email'>
                                <Form.Label>Client Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Client Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mt-2" controlId='address'>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Adress'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mt-2" controlId='city'>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter City'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mt-2" controlId='zipCode'>
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Zip Code'
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group></Col>
                                <Col md={6}>
                                    <Form.Group className="mt-2" controlId='country'>
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Country'
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        <Button type='submit' variant='primary'>
                            Create
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ClientCreatePage