import axios from 'axios'
import {
    CLIENT_LIST_REQUEST,
    CLIENT_LIST_SUCCESS,
    CLIENT_LIST_FAIL,
    CLIENT_DETAILS_REQUEST,
    CLIENT_DETAILS_SUCCESS,
    CLIENT_DETAILS_FAIL,
    CLIENT_DELETE_SUCCESS,
    CLIENT_DELETE_REQUEST,
    CLIENT_DELETE_FAIL,
    CLIENT_CREATE_REQUEST,
    CLIENT_CREATE_SUCCESS,
    CLIENT_CREATE_FAIL,
    CLIENT_UPDATE_REQUEST,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_UPDATE_FAIL,
} from './client.constants'

export const listClients = () => async (
    dispatch
) => {
    try {
        dispatch({ type: CLIENT_LIST_REQUEST })

        const { data } = await axios.get(
            '/api/client'
        )

        dispatch({
            type: CLIENT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CLIENT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listClientDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CLIENT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/client/${id}`)

        dispatch({
            type: CLIENT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CLIENT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteClient = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLIENT_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/client/${id}`, config)

        dispatch({
            type: CLIENT_DELETE_SUCCESS,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout())
        // }
        dispatch({
            type: CLIENT_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createClient = (client) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLIENT_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/client`, client, config)

        dispatch({
            type: CLIENT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout())
        // }
        dispatch({
            type: CLIENT_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateClient = (client) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLIENT_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `/api/client/${client._id}`,
            client,
            config
        )

        dispatch({
            type: CLIENT_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: CLIENT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout())
        // }
        dispatch({
            type: CLIENT_UPDATE_FAIL,
            payload: message,
        })
    }
}