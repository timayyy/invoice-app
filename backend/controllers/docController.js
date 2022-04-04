import path from 'path'
import pdf from 'html-pdf';
import { pdfTemplate } from '../documents/index.js';

const createPdf = (req, res) => {
    const __dirname = path.resolve()
    console.log(__dirname)
    pdf.create(pdfTemplate(req.body), {}).toFile(path.join(__dirname, '/backend/docs/rezultati.pdf'), (err) => {
        if (err) {
            return console.log('error');
        }
        res.send(Promise.resolve())
    });
}
const fetchPdf = (req, res) => {
    const __dirname = path.resolve()
    res.sendFile(path.resolve(__dirname, 'backend', 'docs', 'rezultati.pdf'));
}

export {
    createPdf,
    fetchPdf
}