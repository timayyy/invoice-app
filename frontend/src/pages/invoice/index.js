import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../components/message'
import { Loader } from '../../components/loader'
import { INVOICE_CREATE_RESET } from '../../redux/invoice/invoice.constants'
import { deleteInvoice, listInvoices } from '../../redux/invoice/invoice.actions'
import { Link } from 'react-router-dom'

const InvoiceListPage = ({ history, match }) => {
    const dispatch = useDispatch()

    const invoiceList = useSelector((state) => state.invoiceList)
    const { loading, error, invoices } = invoiceList

    const invoiceDelete = useSelector((state) => state.invoiceDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = invoiceDelete

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: INVOICE_CREATE_RESET })

        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(listInvoices())
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteInvoice(id))
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Invoice List</h1>
                </Col>
                <Col className='text-end'>
                    <Link to='/invoice/create'>
                        <Button variant='info' className='my-3'>
                            <i className='fas fa-plus'></i> Create Invoice
                        </Button>
                    </Link>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    {invoices.length <= 0 ? (
                        <Message >No Invoice</Message>
                    ) : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>PAYMENT DUE DATE</th>
                                    <th>CLIENT</th>
                                    <th>TOTAL</th>
                                    <th>STATUS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr key={invoice._id}>
                                        {/* <td>{invoice._id}</td> */}
                                        <td>{invoice.paymentDueDate}</td>
                                        <td>{invoice.client.name}</td>
                                        <td>{invoice.total}</td>
                                        <td> {invoice.isPaid ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/invoice/${invoice._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <LinkContainer to={`/invoice/${invoice._id}`}>
                                                <Button variant='info' className='btn-sm'>
                                                    <i className='fas fa-eye'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(invoice._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </>
            )}
        </>
    )
}

export default InvoiceListPage