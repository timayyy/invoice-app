import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../components/message'
import { Loader } from '../../components/loader'
import { listInvoiceDetails } from '../../redux/invoice/invoice.actions'
import { listClients } from '../../redux/client/client.actions'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios';
import { saveAs } from 'file-saver';

const InvoiceViewPage = ({ match }) => {
    const invoiceId = match.params.id
    const dispatch = useDispatch()

    const invoiceDetails = useSelector((state) => state.invoiceDetails)
    const { loading, error, invoice } = invoiceDetails



    useEffect(() => {
        if (!invoice.client || invoice._id !== invoiceId) {
            dispatch(listInvoiceDetails(invoiceId))
            dispatch(listClients())
        }
    }, [dispatch, invoice, invoiceId])

    const handleDownloadPdf = async () => {
        axios.post('/api/doc/create-pdf', invoice)
            .then(() => axios.get('/api/doc/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'newPdf.pdf');
            })
    }


    return (
        <>
            <Link to='/invoice' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <h1>View Invoice</h1>
                <hr />
                {error && <Message variant='danger'>{error}</Message>}
                {loading ? (
                    <Loader />
                ) :
                    (
                        <>
                            <div className="row align-items-center">
                                <div className="col-md-6 d-flex">
                                    <div>
                                        <span>Status:</span>
                                    </div>
                                    <div className={invoice.isPaid ? "badge rounded-pill bg-success text-white " : "badge rounded-pill bg-warning text-white"} >
                                        {invoice.isPaid ? 'Paid' : 'Pending'}
                                    </div>
                                </div>
                                <div className='col-md-6 mt-4 mt-md-0 d-flex justify-content-evenly'>
                                    <LinkContainer to={`/invoice/${invoice._id}/edit`}>
                                        <Button variant="info">
                                            Edit
                                        </Button>
                                    </LinkContainer>
                                    <Button onClick={handleDownloadPdf} variant="success">
                                        Download
                                    </Button>
                                </div>


                            </div>
                            <hr />
                            <div className="d-flex flex-wrap">
                                <div className="col-md-4">
                                    <h2>Invoice Date</h2>
                                    <span>{invoice.date}</span>
                                </div>
                                <div className="col-md-4">
                                    <h2>Bill To</h2>
                                    <span>{invoice.client?.name}</span>
                                    <br />
                                    <span>{invoice.client?.email}</span>
                                    <br />
                                    <span>{invoice.client?.city}</span>
                                    <br />
                                    <span>{invoice.client?.country}</span>
                                    <br />
                                </div>
                                <div className="col-md-4">
                                    <h2>Payment Date</h2>
                                    <span>{invoice.paymentDueDate}</span>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h2>Invoice Items</h2>

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
                                        {invoice.items.map((item, index) => (
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className='text-end py-3'>
                                    <h2 className="fw-bold">Amount Due: {invoice.total}</h2>
                                </div>
                            </div>
                        </>
                    )}
            </Container>
        </>
    )
}

export default InvoiceViewPage