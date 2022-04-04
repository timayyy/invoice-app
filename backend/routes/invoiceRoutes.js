import express from 'express'
const router = express.Router()
import {
    createInvoice, deleteInvoice, getInvoiceById, getInvoices, updateInvoice
} from '../controllers/invoiceController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getInvoices).post(protect, createInvoice)
router
    .route('/:id')
    .get(getInvoiceById)
    .delete(protect, deleteInvoice)
    .put(protect, updateInvoice)

export default router