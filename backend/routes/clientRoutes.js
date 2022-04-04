import express from 'express'
const router = express.Router()
import {
    createClient, deleteClient, getClientById, getClients, updateClient
} from '../controllers/clientController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getClients).post(createClient)
router
    .route('/:id')
    .get(getClientById)
    .delete(deleteClient)
    .put(updateClient)

export default router