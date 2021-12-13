import React, { useState } from 'react';
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Modal,
  Alert,
  InputGroup,
} from '@themesberg/react-bootstrap';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Datetime from 'react-datetime';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../services/auth.service';

export const RegisterForm = () => {
  const initialRecordState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    billing_addr: '',
    shipping_addr: '',
  };

  const [modalShow, setModalShow] = useState(false);
  const [record, setRecord] = useState(initialRecordState);
  const [status, setStatus] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [birthDate, setBirthDate] = useState(moment());
  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecord({ ...record, [name]: value });
  };

  const form = document.forms[0];
  const MyVerticallyCenteredModal = props => {
    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>ข้อมูลผู้ใช้งาน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ชื่อผู้ใช้งาน: {record.username}</p>
          <p>
            ชื่อ - นามสกุล: {record.firstName} {record.lastName}
          </p>
          <p>วัน/เดือน/ปีเกิด: {moment(birthDate).format('DD/MM/YYYY')}</p>
          <p>เบอร์ติดต่อ: {record.phone}</p>
          <p>อีเมลล์: {record.email}</p>
        </Modal.Body>
        <Modal.Footer>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Button variant="primary" onClick={sendData}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    setModalShow(true);
  };

  const sendData = () => {
    var data = {
      username: record.username,
      password: record.password,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      phone: record.phone,
      billing_addr: record.billing_addr,
      shipping_addr: record.shipping_addr,
    };
    AuthService.register(data)
      .then(response => {
        setModalShow(false);
        setStatus(1);
        form.reset();
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorMessage(resMessage);
      });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <h5 className="my-4">ข้อมูลผู้ใช้งาน / User Info</h5>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="address">
                <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="ชื่อผู้ใช้งาน"
                  name="username"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="password">
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="รหัสผ่าน"
                  name="password"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="address">
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="ชื่อ"
                  name="firstName"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="address">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="นามสกุล"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={3} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>วัน/เดือน/ปีเกิด</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthDate}
                  closeOnSelect={true}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          birthDate
                            ? moment(birthDate).format('DD/MM/YYYY')
                            : ''
                        }
                        name="birthDate"
                        placeholder="วัน/เดือน/ปี"
                        onFocus={openCalendar}
                        onChange={e => {
                          setBirthDate(e.target.value);
                        }}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="เบอร์ติดต่อ"
                  name="phone"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>อีเมลล์</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="e-mail"
                  name="email"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={10} className="mb-3">
              <Form.Group id="address">
                <Form.Label>ที่อยู่สำหรับใบสั่งซื้อ</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="ที่อยู่"
                  style={{ resize: 'none' }}
                  name="billing_addr"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={10} className="mb-3">
              <Form.Group id="address">
                <Form.Label>ที่อยู่สำหรับจัดส่ง</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="ที่อยู่"
                  style={{ resize: 'none' }}
                  name="shipping_addr"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <div>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ height: 55, width: '100%' }}>
                  ลงทะเบียน
                </Button>
              </div>
            </Col>
            <Col md={5}>
              {status === 1 ? (
                <Alert
                  variant="success"
                  onClose={() => setStatus(0)}
                  dismissible>
                  บันทึกข้อมูลเรียบร้อยแล้ว !
                </Alert>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </Form>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setErrorMessage('');
          }}
        />
      </Card.Body>
    </Card>
  );
};
