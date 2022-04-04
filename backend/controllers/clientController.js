import asyncHandler from 'express-async-handler'
import Client from '../models/clientModel.js'

// @desc    Fetch all client
// @route   GET /api/client
// @access  Public
const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.find({})

    res.json(clients)
})

// @desc    Fetch single client
// @route   GET /api/client/:id
// @access  Public
const getClientById = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id)

    if (client) {
        res.json(client)
    } else {
        res.status(404)
        throw new Error('client not found')
    }
})

// @desc    Delete a client
// @route   DELETE /api/client/:id
// @access  Private
const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id)

    if (client) {
        await client.remove()
        res.json({ message: 'Client removed' })
    } else {
        res.status(404)
        throw new Error('Client not found')
    }
})

// @desc    Create a client
// @route   POST /api/client
// @access  Private
const createClient = asyncHandler(async (req, res) => {
    const { name, email, streetAddress, city, zipCode, country } = req.body

    const client = await Client.create({
        name,
        email,
        streetAddress,
        city,
        zipCode,
        country,
    })

    if (client) {
        res.status(201).json(client);
    } else {
        res.status(400);
        throw new Error("Error creating client");
    }
})

// @desc    Update an client
// @route   PUT /api/client/:id
// @access  Private
const updateClient = asyncHandler(async (req, res) => {
    const { name, email, streetAddress, city, zipCode, country } = req.body

    const client = await Client.findById(req.params.id)

    if (client) {
        client.name = name
        client.email = email
        client.streetAddress = streetAddress
        client.city = city
        client.zipCode = zipCode
        client.countrycountry = country

        const updatedClient = await client.save()
        res.json(updatedClient)
    } else {
        res.status(404)
        throw new Error('Client not found')
    }
})

export {
    getClients,
    getClientById,
    deleteClient,
    createClient,
    updateClient,
}