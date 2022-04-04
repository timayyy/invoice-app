import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../components/message'
import { Loader } from '../../components/loader'
import { FormContainer } from '../../components/form-container'
import { login } from '../../redux/user/user.actions'

const LoginPage = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/invoice'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
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
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
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
                <div className="d-grid gap-2">

                    <Button type='submit' variant='primary'>
                        Sign In
                    </Button>
                    <GoogleLogin
                        clientId="145984179186-di2obf0sna5n0rts7tlqq2v5bn41i73k.apps.googleusercontent.com"
                        buttonText="Login"
                        render={(renderProps) => (
                            <Button variant='info' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                Google Sign In
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
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage