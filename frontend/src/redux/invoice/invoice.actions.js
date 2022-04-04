import axios from 'axios'
import {
    INVOICE_LIST_REQUEST,
    INVOICE_LIST_SUCCESS,
    INVOICE_LIST_FAIL,
    INVOICE_DETAILS_REQUEST,
    INVOICE_DETAILS_SUCCESS,
    INVOICE_DETAILS_FAIL,
    INVOICE_DELETE_SUCCESS,
    INVOICE_DELETE_REQUEST,
    INVOICE_DELETE_FAIL,
    INVOICE_CREATE_REQUEST,
    INVOICE_CREATE_SUCCESS,
    INVOICE_CREATE_FAIL,
    INVOICE_UPDATE_REQUEST,
    INVOICE_UPDATE_SUCCESS,
    INVOICE_UPDATE_FAIL,
} from './invoice.constants'
import { logout } from '../user/user.actions'

export const listInvoices = () => async (
    dispatch
) => {
    try {
        dispatch({ type: INVOICE_LIST_REQUEST })

        const { data } = await axios.get(
            '/api/invoice'
        )

        dispatch({
            type: INVOICE_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: INVOICE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listInvoiceDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: INVOICE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/invoice/${id}`)

        dispatch({
            type: INVOICE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: INVOICE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteInvoice = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INVOICE_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/invoice/${id}`, config)

        dispatch({
            type: INVOICE_DELETE_SUCCESS,
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
            type: INVOICE_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createInvoice = (invoice) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INVOICE_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/invoice`, invoice, config)

        dispatch({
            type: INVOICE_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: INVOICE_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateInvoice = (invoice) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INVOICE_UPDATE_REQUEST,
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
            `/api/invoice/${invoice._id}`,
            invoice,
            config
        )

        dispatch({
            type: INVOICE_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: INVOICE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout())
        // }
        dispatch({
            type: INVOICE_UPDATE_FAIL,
            payload: message,
        })
    }
}