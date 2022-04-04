import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logout } from '../../redux/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout(history))
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Invoice App</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo ? (
                                <>
                                    <LinkContainer to="/invoice">
                                        <Nav.Link >Invoice</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/client">
                                        <Nav.Link>Client</Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export { Header }