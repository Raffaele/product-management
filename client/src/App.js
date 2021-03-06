import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Container } from 'reactstrap';


import 'bootstrap/dist/css/bootstrap.min.css';

import { ProductDisplay } from './components/ProductsDisplay/ProductsDisplay';
import { ProductForm } from './components/ProductForm/ProductForm';

import { ContextWrapper } from './engine/ContextWrapper';

function App() {
  return (
    <ContextWrapper>
      <Router>
        
        <Container>
          <h1 className="main-title">Product selector</h1>
          
          <Switch>
            <Route path="/edit-product/:productId">
              <ProductForm />
            </Route>
            <Route path="/new-product">
              <ProductForm />
            </Route>
            <Route path="/">
              <ProductDisplay />
            </Route>
          </Switch>
          
        </Container>
      </Router>
    </ContextWrapper>
  );
}

export default App;
