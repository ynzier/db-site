import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from './routes';

// components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import NotFoundPage from './pages/NotFound';
import ServerError from './pages/ServerError';
//deploy
import Register from './deploy/Register';

import Cart from './deploy/Cart';
import AddItem from './deploy/AddItem';
import Dashboard from './deploy/ProductList';
import Record from './deploy/Record';
import ToPDF from './deploy/ToPDF';
import Setting from './deploy/Setting';
import Tickets from './deploy/Tickets';
import Ticket from './deploy/Ticket';

//API Services

const App = () => {
  // const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();
  //   if (!currentUser && user) {
  //     setCurrentUser(user);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const RouteWithLoader = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <Route
        {...rest}
        render={props => (
          <>
            <Preloader show={loaded ? false : true} /> <Component {...props} />
          </>
        )}
      />
    );
  };
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
        <RouteWithLoader
          exact
          path={Routes.NotFound.path}
          component={NotFoundPage}
        />
        <RouteWithLoader
          exact
          path={Routes.ServerError.path}
          component={ServerError}
        />
        {/* deploy */}
        {/* <RouteWithLoader exact path="/" component={SignIn} /> */}
        <RouteWithSidebar
          exact
          path={Routes.Dashboard.path}
          component={Dashboard}
        />{' '}
        <RouteWithSidebar
          exact
          path={Routes.Cart.path}
          component={Cart}
        />
        <RouteWithSidebar
          exact
          path={Routes.AddItem.path}
          component={AddItem}
        />
        <RouteWithSidebar
          exact
          path={Routes.Setting.path}
          component={Setting}
        />
        <RouteWithSidebar
          exact
          path={Routes.Setting.path}
          component={Setting}
        />
        <RouteWithSidebar exact path={Routes.Record.path} component={Record} />
        <RouteWithSidebar
          exact
          path={Routes.Tickets.path}
          component={Tickets}
        />
        <RouteWithSidebar
          exact
          path={Routes.TicketID.path}
          component={Ticket}
        />
        <RouteWithSidebar
          exact
          path={Routes.Register.path}
          component={Register}
        />
        <Route exact path={Routes.ToPDF.path} component={ToPDF} />
        <Redirect to={Routes.NotFound.path} />
      </Switch>
    </>
  );
};
export default App;
