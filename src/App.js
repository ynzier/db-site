import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from './routes';

// components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
//deploy
import Register from './deploy/Register';
import Receipts from './deploy/Receipts';

import Cart from './deploy/Cart';
import AddItem from './deploy/AddItem';
import Dashboard from './deploy/ProductList';

//API Services

const App = () => {
  const RouteWithSidebar = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => (
          <>
            <Sidebar />

            <main className="content">
              <Navbar />
              <Component {...props} />
            </main>
          </>
        )}
      />
    );
  };

  return (
    <>
      <Switch>
        {/* deploy */}
        <RouteWithSidebar
          exact
          path={Routes.Dashboard.path}
          component={Dashboard}
        />
        <RouteWithSidebar exact path={Routes.Cart.path} component={Cart} />
        <RouteWithSidebar
          exact
          path={Routes.AddItem.path}
          component={AddItem}
        />

        <RouteWithSidebar
          exact
          path={Routes.Register.path}
          component={Register}
        />
        <RouteWithSidebar
          exact
          path={Routes.Receipts.path}
          component={Receipts}
        />
      </Switch>
    </>
  );
};
export default App;
