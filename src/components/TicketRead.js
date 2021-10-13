import React, { useState, useEffect } from 'react';

import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Alert,
} from '@themesberg/react-bootstrap';
import TicketDataService from '../services/ticket.service';

var record = [];

export const TicketRead = props => {
  const [alert, setAlert] = useState(0);
  const [name, setname] = useState();
  const [serialID, setserialID] = useState();
  const [email, setemail] = useState();
  const [tel, settel] = useState();
  const [message, setmessage] = useState();
  const [base64TextString, setBase64TextString] = useState();
  const [subject, setsubject] = useState();
  const [status, setstatus] = useState();
  useEffect(() => {
    if (props.data) {
      record = props.data;
      setname(record.name);
      setemail(record.email);
      setserialID(record.serialID);
      settel(record.tel);
      setsubject(record.subject);
      setstatus(record.status);
      setBase64TextString(record.image);
      setmessage(record.message);
    }
  }, [props.data]);

  const handleSubmit = e => {
    e.preventDefault();
    updateCustomer();
  };

  const updateCustomer = () => {
    var data = {
      message: message,
      status: status,
    };
    TicketDataService.update(props.data._id, data)
      .then(response => {
        setAlert(1);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        {record !== '' && (
          <Form onSubmit={handleSubmit}>
            <h5 className="my-4">ข้อความ</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="address">
                  <Form.Label>ชื่อ - นามสกุล ผู้ติดต่อ</Form.Label>
                  <Form.Control disabled type="text" value={name} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={10} className="mb-3">
                <Form.Group id="address">
                  <Form.Label>อีเมลล์ติดต่อ</Form.Label>
                  <Form.Control disabled type="text" value={email} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="phone">
                  <Form.Label>เบอร์ติดต่อ</Form.Label>
                  <Form.Control disabled type="text" value={tel} />
                </Form.Group>
              </Col>
            </Row>
            <h5 className="mb-4">ข้อมูลสินค้า / Goods Info</h5>

            <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="modelID">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={e => setstatus(e.target.value)}>
                    <option value="ยังไม่ได้อ่าน">ยังไม่ได้อ่าน</option>
                    <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                    <option value="เรียบร้อยแล้ว">เรียบร้อยแล้ว</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="ItemNo">
                  <Form.Label>รหัสสินค้า (Serial No.)</Form.Label>
                  <Form.Control disabled type="text" value={serialID} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="ItemNo">
                  <Form.Label>หัวข้อ</Form.Label>
                  <Form.Control disabled type="text" value={subject} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={10} className="mb-3">
                <Form.Group id="comment">
                  <Form.Label>หมายเหตุ</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={message}
                    onChange={e => setmessage(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <img
                  src={`data:image/jpeg;base64,${base64TextString}`}
                  alt=""
                />
              </Col>
            </Row>
            <div className="mt-3">
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
            {alert === 1 ? (
              <Alert
                variant="success"
                style={{ marginTop: 20 }}
                onClose={() => setAlert(0)}
                dismissible>
                บันทึกข้อมูลเรียบร้อยแล้ว !
              </Alert>
            ) : (
              ''
            )}
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};
