**How long did you spend on the coding test?**
2-4 days

**What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add?**
There are alot of features I left out. For example. 
Protected routes on both the frontend and backend
Sending invoice via email
Searching invoice by client name
And Ultimately, TESTING

**What was the most useful feature that was added by you in the application? Did you use any existing library for it? If yes, please share the link. Please include a snippet of code that shows how you've used it?**
Most useful feature that was added is the PDF download feature. 
Yes i used an existing library (html-pdf): [html-pdf](https://www.npmjs.com/package/html-pdf?activeTab=readme)

CODE SNIPPET

```
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
```

**How would you track down a performance issue in production? Have you ever had to do this??**
This can be done using performance profiling with React DevTools. No i have not had to do this.

**List of all the libraries and packages used to complete the assignement**
* bcryptjs
* dotenv
* express
* express-async-handler
* html-pdf
* jsonwebtoken
* moment
* mongoose
* axios
* file-saver
* react
* react-bootstrap
* react-dom
* react-hook-form
* react-redux
* react-router-bootstrap
* react-router-dom
* redux
* redux-thunk
* redux-devtools-extension
* react-google-login
