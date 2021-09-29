import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const Layout = lazy(() => import('../layout'));
const Home = lazy(() => import('../home'));
const PokemonDetails = lazy(() => import('../pokemon-details'));

const App = () => (
  <Suspense fallback={<div>loading...</div>}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/pokemon/:id" component={PokemonDetails} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Suspense>
);

export default App;
