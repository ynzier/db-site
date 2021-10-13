/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import {
  Row,
  Col,
  Nav,
  Image,
  Navbar,
  Dropdown,
  Container,
  Button,
  ListGroup,
  Modal,
} from '@themesberg/react-bootstrap';

import Profile3 from '../assets/img/jib.png';
import AuthService from '../services/auth.service';

import { EditProfile } from '../components/EditProfile';

export default () => {
  const [modalShow, setModalShow] = useState(false);
  const logOut = () => {
    AuthService.logout();
  };

  const MyVerticallyCenteredModal = props => {
    return (
      <Modal {...props} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>ข้อมูลส่วนตัว</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  };

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    document.title = 'รายการทั้งหมด';
    if (JSON.parse(localStorage.getItem('user')))
      setCurrentUser(JSON.parse(localStorage.getItem('user')).username);
  }, []);
  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center"></div>
          <Nav className="align-items-center">
            {currentUser && (
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                  <div className="media d-flex align-items-center">
                    <Image
                      src={Profile3}
                      className="user-avatar md-avatar rounded-circle"
                    />
                    &nbsp;&nbsp;
                    <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                      <Button>
                        <span
                          className="mb-0 font-small fw-bold"
                          style={{ color: 'white' }}>
                          User: {currentUser}
                        </span>
                      </Button>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                  <Dropdown.Item
                    className="fw-bold"
                    onClick={() => setModalShow(true)}>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="me-2"
                    />
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="fw-bold"
                    onClick={() => {
                      logOut();
                      window.location = '/';
                    }}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="text-danger me-2"
                    />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </div>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </Navbar>
  );
};
