export const Routes = {
  // pages
  Lock: { path: '/examples/lock' },
  NotFound: { path: '/examples/404' },
  ServerError: { path: '/examples/500' },

  // deployment
  Signin: { path: '/' },
  Dashboard: { path: '/' },
  Register: { path: '/register' },
  Cart: { path: '/mycart' },


  
  AddItem: { path: '/dashboard/additem' },
  Setting: { path: '/dashboard/setting' },
  Record: { path: '/record/:id' },
  ToPDF: { path: '/print/:id' },
  Tickets: { path: '/dashboard/tickets' },
  TicketID: { path: '/ticket/:id' },
};
