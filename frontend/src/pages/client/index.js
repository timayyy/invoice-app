import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../components/message'
import { Loader } from '../../components/loader'
import { CLIENT_CREATE_RESET } from '../../redux/client/client.constants'
import { deleteClient, listClients } from '../../redux/client/client.actions'
import { Link } from 'react-router-dom'

const ClientListPage = ({ history, match }) => {
    const dispatch = useDispatch()

    const clientList = useSelector((state) => state.clientList)
    const { loading, error, clients } = clientList

    const clientDelete = useSelector((state) => state.clientDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = clientDelete

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: CLIENT_CREATE_RESET })

        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(listClients())
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteClient(id))
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Client List</h1>
                </Col>
                <Col className='text-end'>
                    <Link to='/client/create'>
                        <Button variant='info' className='my-3'>
                            <i className='fas fa-plus'></i> Create Client
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
                    {clients.length <= 0 ? (
                        <Message >No Client</Message>
                    ) : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADDRESS</th>
                                    <th>CITY</th>
                                    <th>COUNTRY</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client._id}>
                                        {/* <td>{client._id}</td> */}
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.streetAddress}</td>
                                        <td>{client.city}</td>
                                        <td>{client.country}</td>
                                        <td>
                                            <LinkContainer to={`/client/${client._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(client._id)}
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

export default ClientListPage