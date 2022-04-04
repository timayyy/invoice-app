export const pdfTemplate = (invoice) => {
    return `
        <!doctype html>
        <html>
           <head>
              <meta charset="utf-8">
              <title>PDF Result Template</title>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
           </head>
           <body>
              <div class="d-flex flex-wrap">
                                <div class="col-md-4">
                                    <h2>Invoice Date</h2>
                                    <span>${invoice.date}</span>
                                </div>
                                <div class="col-md-4">
                                    <h2>Bill To</h2>
                                    <span>${invoice.client.name}</span>
                                    <br />
                                    <span>${invoice.client.email}</span>
                                    <br />
                                    <span>${invoice.client.city}</span>
                                    <br />
                                    <span>${invoice.client.country}</span>
                                    <br />
                                </div>
                                <div class="col-md-4">
                                    <h2>Payment Date</h2>
                                    <span>${invoice.paymentDueDate}</span>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h2>Invoice Items</h2>

                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${invoice.items.map((item) => (
        `<tr >
            <td>${item.itemName}
            </td>
            <td>
                ${item.qty}
            </td>
            <td>
                ${item.price}
            </td>
            <td>${item.total}</td>
        </tr>`
    ))}
                                    </tbody>
                                </table>
                                <div class='text-end py-3'>
                                    <h2 class="fw-bold">Amount Due: ${invoice.total}</h2>
                                </div>
                            </div>
           </body>
        </html>
        `;
}