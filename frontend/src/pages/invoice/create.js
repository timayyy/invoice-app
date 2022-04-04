import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../components/message'
import { Loader } from '../../components/loader'
import { FormContainer } from '../../components/form-container'
import { createInvoice } from '../../redux/invoice/invoice.actions'
import { INVOICE_CREATE_RESET } from '../../redux/invoice/invoice.constants'
import { listClients } from '../../redux/client/client.actions'

const InvoiceCreatePage = ({ history }) => {
    const clientList = useSelector((state) => state.clientList)
    const { loading: loadingClient, error: errorClient, clients } = clientList

    const [billerStreetAdress, setBillerStreetAdress] = useState('')
    const [billerCity, setBillerCity] = useState('')
    const [billerZipCode, setBillerZipCode] = useState('')
    const [billerCountry, setBillerCountry] = useState('')
    const [client, setClient] = useState('')
    const [paymentDate, setPaymentDate] = useState(Date.now());
    const [paymentDueDate, setPaymentDueDate] = useState(new Date());
    const [description, setDescription] = useState('')
    const [items, setItems] = useState([])
    const [itemName, setItemName] = useState('')
    const [itemQty, setItemQty] = useState(0)
    const [itemPrice, setItemPrice] = useState(0)
    const [formFieldsMessage, setFormFieldsMessage] = useState(null)

    const dispatch = useDispatch()

    const invoiceCreate = useSelector((state) => state.invoiceCreate)
    const {
        loading,
        error,
        success,
    } = invoiceCreate



    useEffect(() => {
        dispatch(listClients())
        setClient(clients[0])
        if (success) {
            dispatch({ type: INVOICE_CREATE_RESET })
            history.push('/invoice')
        }
    }, [dispatch, history, success])

    const submitHandler = (e) => {
        e.preventDefault()

        let total = 0
        items.forEach(item => {
            total += item.total
        })
        dispatch(
            createInvoice({
                billerStreetAdress,
                billerCity,
                billerZipCode,
                billerCountry,
                client,
                date: paymentDate,
                paymentDueDate,
                description,
                items,
                total
            })
        )
    }

    const addNewInvoiceItem = () => {
        if (itemName === '' || itemQty === 0 || itemPrice === 0) {
            setFormFieldsMessage('Fill in all fields')
            return;
        }
        setItems([...items, {
            id: Math.random(),
            itemName: itemName,
            qty: itemQty,
            price: itemPrice,
            total: itemQty * itemPrice
        }])
        setFormFieldsMessage(null)
        setItemName('')
        setItemQty(0)
        setItemPrice(0)
    }
    const deleteInvoiceItem = (id) => {
        setItems(items.filter(item => item.id != id))
    }

    return (
        <>
            <Link to='/invoice' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Create Invoice</h1>
                <hr />
                {error && <Message variant='danger'>{error}</Message>}
                {loading ? (
                    <Loader />
                ) :
                    (
                        <Form onSubmit={submitHandler}>
                            <div className="mt-2 mb-5">
                                <p className="fw-bold text-info text-uppercase">Bill From</p>
                                <Form.Group className="mt-2" controlId='billerStreetAdress'>
                                    <Form.Label>Street Adress</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Street Adress'
                                        value={billerStreetAdress}
                                        onChange={(e) => setBillerStreetAdress(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mt-2" controlId='billerCity'>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Enter City'
                                                value={billerCity}
                                                onChange={(e) => setBillerCity(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mt-2" controlId='billerZipCode'>
                                            <Form.Label>Zip Code</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Enter Zip Code'
                                                value={billerZipCode}
                                                onChange={(e) => setBillerZipCode(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group></Col>
                                    <Col md={4}>
                                        <Form.Group className="mt-2" controlId='billerCountry'>
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Enter Country'
                                                value={billerCountry}
                                                onChange={(e) => setBillerCountry(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <hr />
                            <div className="my-5">
                                <p className="fw-bold text-info text-uppercase">Bill To</p>
                                {loadingClient ? <Loader /> : errorClient ? <Message>{errorClient}</Message> : clients.length < 1 ? (
                                    <Link to='/client/create'>
                                        <Button variant='info' >
                                            <i className='fas fa-plus'></i> Create Client
                                        </Button>
                                    </Link>
                                ) : (
                                    <Form.Group className="mt-2" controlId='client'>
                                        <Form.Label>Select Client</Form.Label>
                                        <Form.Control
                                            as='select'
                                            value={client}
                                            onChange={(e) => setClient(e.target.value)}
                                        >
                                            {clients.map((client, index) => (
                                                <option key={index} value={client._id}>{client.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                )}
                            </div>
                            <hr />
                            <div className="my-5">
                                <p className="fw-bold text-info text-uppercase">Invoice Info</p>
                                <Row className="mt-2">
                                    <Form.Group as={Col} md="6" controlId="paymentDate">
                                        <Form.Label>Payment Date</Form.Label>
                                        <Form.Control type='date' value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="paymentDueDate">
                                        <Form.Label>Payment Due Date</Form.Label>
                                        <Form.Control type='date' value={paymentDueDate} onChange={(e) => setPaymentDueDate(e.target.value)} />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mt-2" controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder='Enter description '
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)} rows={3} />
                                </Form.Group>

                                <div>
                                    <p>Item List</p>
                                    {formFieldsMessage && <Message variant="danger">{formFieldsMessage}</Message>}
                                    <Row className='align-items-center'>
                                        <Form.Group as={Col} md="3" controlId="itemName">
                                            <Form.Label>Item Name</Form.Label>
                                            <Form.Control
                                                type='text'
                                                value={itemName}
                                                placeholder="Enter Item Name"
                                                onChange={(e) => setItemName(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="itemQty">
                                            <Form.Label>Item Qty</Form.Label>
                                            <Form.Control
                                                type='number'
                                                min={0}
                                                required
                                                value={itemQty}
                                                onChange={(e) => setItemQty(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="itemPrice">
                                            <Form.Label>Item Price</Form.Label>
                                            <Form.Control
                                                type='number'
                                                min={0}
                                                required
                                                value={itemPrice}
                                                onChange={(e) => setItemPrice(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Col md={3}>
                                            <Button
                                                variant='info'
                                                onClick={() => addNewInvoiceItem()}
                                            >
                                                <i className='fas fa-plus'></i>
                                                Add Item
                                            </Button>
                                        </Col>

                                    </Row>

                                    <Table bordered hover responsive className='table-sm'>
                                        <thead>
                                            <tr>
                                                <th>Item Name</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.itemName}
                                                    </td>
                                                    <td>
                                                        {item.qty}
                                                    </td>
                                                    <td>
                                                        {item.price}
                                                    </td>
                                                    <td>{item.total}</td>
                                                    <td>
                                                        <Button
                                                            variant='danger'
                                                            className='btn-sm'
                                                            onClick={() => deleteInvoiceItem(item.id)}
                                                        >
                                                            <i className='fas fa-trash'></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {/* <Button onClick={addNewInvoiceItem} variant='info'>
                                    Add New Item
                                </Button> */}
                                </div>
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

export default InvoiceCreatePage