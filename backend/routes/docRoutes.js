import express from 'express'
const router = express.Router()
import {
    createPdf, fetchPdf
} from '../controllers/docController.js'

router.route('/create-pdf').post(createPdf)
router.route('/fetch-pdf').get(fetchPdf)

export default router