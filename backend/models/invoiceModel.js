import mongoose from "mongoose";

const invoiceItemSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
})

const invoiceSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Client'
        },
        billerStreetAdress: {
            type: String,
            required: true,
        },
        billerCity: {
            type: String,
            required: true,
        },
        billerZipCode: {
            type: String,
            required: true,
        },
        billerCountry: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
            deafult: Date.now,
            required: true,
        },
        paymentDueDate: {
            type: Date,
            required: true,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false
        },
        total: {
            type: Number,
            required: true,
            default: 0,
        },
        items: [invoiceItemSchema]
    },
    {
        timestamps: true,
    }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;