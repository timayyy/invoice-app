import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Header } from './components/header';

import { Container } from 'react-bootstrap';
import { HomePage, LoginPage, RegisterPage, InvoiceListPage, InvoiceCreatePage, ClientListPage, ClientCreatePage, InvoiceEditPage, InvoiceViewPage } from './pages';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Container>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/invoice" exact component={InvoiceListPage} />
            <Route path="/invoice/create" exact component={InvoiceCreatePage} />
            <Route path="/invoice/:id/edit" exact component={InvoiceEditPage} />
            <Route path="/invoice/:id" exact component={InvoiceViewPage} />
            <Route path="/client" exact component={ClientListPage} />
            <Route path="/client/create" exact component={ClientCreatePage} />
          </Container>
        </main>
      </Router>
    </>
  );
}

export default App;
