/* eslint-disable import/no-anonymous-default-export */

import React, { useState, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faTasks,
  faTimes,
  faShoppingCart,
  faEnvelope,
  faUnlockAlt,
  faHistory
} from '@fortawesome/free-solid-svg-icons';
import {
  Nav,
  Badge,
  Image,
  Button,
  Navbar,
  InputGroup,
  Form,
} from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from '../routes';
import AuthService from '../services/auth.service';

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? 'show' : '';
  const logOut = () => {
    AuthService.logout();
  };

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleLogin = e => {
    e.preventDefault();

    AuthService.login(Username, Password).then(
      () => {
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      },
    );
  };
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!currentUser && user) {
      setCurrentUser(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onCollapse = () => setShow(!show);
  const NavItem = props => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = 'secondary',
      badgeColor = 'primary',
    } = props;

    const classNames = badgeText
      ? 'd-flex justify-content-start align-items-center justify-content-between'
      : '';
    const navItemClassName = link === pathname ? 'active' : '';
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{' '}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2">
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                </div>
                <div className="d-block">
                  <h6>Hello !</h6>
                  <Button
                    as={Link}
                    variant="secondary"
                    size="xs"
                    to={Routes.Signin.path}
                    className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{' '}
                    Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem
                title="รายการสินค้า"
                icon={faTasks}
                link={Routes.Dashboard.path}
              />
              <NavItem
                title="ตะกร้าสินค้า"
                icon={faShoppingCart}
                link={Routes.Cart.path}
              />
              <NavItem title="ประวัติการสั่งซื้อ" icon={faHistory} link={Routes.Receipts.path}/>
              {currentUser != null ? (
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => {
                    logOut();
                    window.location = '/';
                  }}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="me-1"
                    color="red"
                  />
                  Sign Out
                </Button>
              ) : (
                <Form className="mt-4" onSubmit={handleLogin}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Account</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <Button variant="primary" type="submit" className="w-50">
                    Sign in
                  </Button>
                  <Button
                    as={Link}
                    variant="primary"
                    to={Routes.Register.path}
                    className="w-50">
                    Register
                  </Button>
                </Form>
              )}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
