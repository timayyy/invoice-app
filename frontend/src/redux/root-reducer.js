import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist'


import { alertReducer } from './alert/alert.reducers';
import { invoiceCreateReducer, invoiceDeleteReducer, invoiceDetailsReducer, invoiceListReducer, invoiceUpdateReducer } from './invoice/invoice.reducers';
import { clientCreateReducer, clientDeleteReducer, clientDetailsReducer, clientListReducer, clientUpdateReducer } from './client/client.reducers';
import { userLoginReducer, userRegisterReducer } from './user/user.reducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    invoiceList: invoiceListReducer,
    invoiceDetails: invoiceDetailsReducer,
    invoiceDelete: invoiceDeleteReducer,
    invoiceCreate: invoiceCreateReducer,
    invoiceUpdate: invoiceUpdateReducer,
    clientList: clientListReducer,
    clientDetails: clientDetailsReducer,
    clientDelete: clientDeleteReducer,
    clientCreate: clientCreateReducer,
    clientUpdate: clientUpdateReducer,
    alert: alertReducer
});

export default rootReducer;