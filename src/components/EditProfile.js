import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Alert,
} from '@themesberg/react-bootstrap';
import CustomerService from '../services/customer.service';
const EditProfile = props => {
  const [userName, setuserName] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState();
  const [billingAddr, setbillingAddr] = useState('');
  const [shippingAddr, setShippingAddr] = useState('');

  const [status, setStatus] = useState(0);

  useEffect(() => {
    document.title = 'แก้ไขโปรไฟล์';
    let mounted = true;
    CustomerService.getCustomerDetail(
      JSON.parse(localStorage.getItem('user')).custNo,
    )
      .then(res => {
        if (mounted) {
          setuserName(res.data.username);
          setfirstName(res.data.firstName);
          setlastName(res.data.lastName);
          setemail(res.data.email);
          setphone(res.data.phone);
          setbillingAddr(res.data.billing_addr);
          setShippingAddr(res.data.shipping_addr);
        }
      })
      .catch(e => {
        console.log(e);
      });
    return () => (mounted = false);
  }, []);

  const form = document.forms[0];

  const handleSubmit = e => {
    updateData();
    e.preventDefault();
  };

  const updateData = () => {
    var data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      billing_addr: billingAddr,
      shipping_addr: shippingAddr,
    };
    CustomerService.update(
      JSON.parse(localStorage.getItem('user')).custNo,
      data,
    )
      .then(response => {
        console.log('ok');
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
        alert(resMessage);
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
                  defaultValue={userName}
                  name="username"
                  disabled
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
                  defaultValue={firstName}
                  onChange={e => setfirstName(e.target.value)}
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
                  defaultValue={lastName}
                  onChange={e => setlastName(e.target.value)}
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
                  defaultValue={phone}
                  onChange={e => setphone(e.target.value)}
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
                  defaultValue={email}
                  onChange={e => setemail(e.target.value)}
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
                  name="description"
                  defaultValue={billingAddr}
                  onChange={e => {
                    setbillingAddr(e.target.value);
                  }}
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
                  name="description"
                  defaultValue={shippingAddr}
                  onChange={e => {
                    setShippingAddr(e.target.value);
                  }}
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
                  บันทึก
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
      </Card.Body>
    </Card>
  );
};

export { EditProfile };
