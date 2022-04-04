import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from "../../components/loader"
import { Message } from "../../components/message"
import { FormContainer } from '../../components/form-container'
import { register } from '../../redux/user/user.actions'

const RegisterPage = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/invoice'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }
    const googleSuccess = async (res) => {
        console.log(res)
        const data = res?.profileObj
        const token = res?.tokenId

        const { email, name } = data

        try {
            dispatch({ type: 'AUTH', payload: { email, name, token } })
        } catch (error) {

        }
    }
    const googleFailure = () => {
        console.log('Google sign in unsuccessful')
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <div className="d-grid gap-2">

                    <Button type='submit' variant='primary'>
                        Register
                    </Button>
                    <GoogleLogin
                        clientId="145984179186-di2obf0sna5n0rts7tlqq2v5bn41i73k.apps.googleusercontent.com"
                        buttonText="Login"
                        render={(renderProps) => (
                            <Button variant='info' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                Google Sign Up
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterPage