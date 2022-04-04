import asyncHandler from 'express-async-handler'
import moment from 'moment';
import Invoice from '../models/invoiceModel.js'

// @desc    Fetch all invoice
// @route   GET /api/invoice
// @access  Public
const getInvoices = asyncHandler(async (req, res) => {
    const invoices = await Invoice.find({}).populate("client", "name");

    res.json(invoices)
})

// @desc    Fetch single invoice
// @route   GET /api/invoice/:id
// @access  Public
const getInvoiceById = asyncHandler(async (req, res) => {
    const invoiceObj = await Invoice.findById(req.params.id).populate("client")

    if (invoiceObj) {
        let m = moment()
        m = moment(invoiceObj.date).format('YYYY-MM-DD')
        const invoiceDate = m.toString()
        m = moment(invoiceObj.paymentDueDate).format('YYYY-MM-DD')
        const invoicePaymentDueDate = m.toString()
        const invoice = {
            _id: invoiceObj._id,
            client: invoiceObj.client,
            billerStreetAdress: invoiceObj.billerStreetAdress,
            billerCity: invoiceObj.billerCity,
            billerZipCode: invoiceObj.billerZipCode,
            billerCountry: invoiceObj.billerCountry,
            description: invoiceObj.description,
            date: invoiceDate,
            paymentDueDate: invoicePaymentDueDate,
            isPaid: invoiceObj.isPaid,
            total: invoiceObj.total,
            items: invoiceObj.items,
        }
        res.json(invoice)
    } else {
        res.status(404)
        throw new Error('Invoice not found')
    }
})

// @desc    Delete a invoice
// @route   DELETE /api/invoice/:id
// @access  Private
const deleteInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id)

    if (invoice) {
        await invoice.remove()
        res.json({ message: 'Invoice removed' })
    } else {
        res.status(404)
        throw new Error('Invoice not found')
    }
})

// @desc    Create an invoice
// @route   POST /api/invoice
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {
    const { client, billerStreetAdress, billerCity, billerZipCode, billerCountry, description, date, paymentDueDate, isPaid, total, items } = req.body

    const invoice = await Invoice.create({
        user: req.user._id,
        client,
        billerStreetAdress,
        billerCity,
        billerZipCode,
        billerCountry,
        description,
        date,
        paymentDueDate,
        isPaid,
        total,
        items
    })

    if (invoice) {
        res.status(201).json(invoice);
    } else {
        res.status(400);
        throw new Error("Error creating Invoice");
    }
})

// @desc    Update an invoice
// @route   PUT /api/invoice/:id
// @access  Private
const updateInvoice = asyncHandler(async (req, res) => {
    const { client, billerStreetAdress, billerCity, billerZipCode, billerCountry, description, date, paymentDueDate, isPaid, total, items } = req.body

    const invoice = await Invoice.findById(req.params.id)

    if (invoice) {
        invoice.client = client
        invoice.billerStreetAdress = billerStreetAdress
        invoice.billerCity = billerCity
        invoice.billerZipCode = billerZipCode
        invoice.billerCountry = billerCountry
        invoice.description = description
        invoice.date = date
        invoice.paymentDueDate = paymentDueDate
        invoice.isPaid = isPaid
        invoice.total = total
        invoice.items = items

        const updatedInvoice = await invoice.save()
        res.json(updatedInvoice)
    } else {
        res.status(404)
        throw new Error('Invoice not found')
    }
})

export {
    getInvoices,
    getInvoiceById,
    deleteInvoice,
    createInvoice,
    updateInvoice,
}