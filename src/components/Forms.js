import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Datetime from 'react-datetime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
  Modal,
  Alert,
} from '@themesberg/react-bootstrap';
import CustomerDataService from '../services/customer.service';

import GoodsDataService from '../services/goods.service';

var getData = [];
export const GeneralInfoForm = () => {
  const initialRecordState = {
    name: '',
    tel: '',
    address: '',
    modelID: '',
    serialID: '',
    invoiceID: '',
  };

  const [purchaseDate, setPurchaseDate] = useState(moment());
  const [modalShow, setModalShow] = useState(false);
  const [modelData, setmodelData] = useState([]);
  const [itemCount, setItemCount] = useState(1);
  const [massSerial, setMassSerial] = useState();
  const [warrantyTime, setWarrantyTime] = useState(1);
  const [modelID, setModelID] = useState('SKT-201T');
  const [record, setRecord] = useState(initialRecordState);
  const [status, setStatus] = useState(0);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecord({ ...record, [name]: value });
  };

  useEffect(() => {
    document.title = 'ตั้งค่าระบบ';
    let mounted = true;
    GoodsDataService.getAll()
      .then(res => {
        if (mounted) {
          getData = res.data;
          setmodelData(getData);
        }
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
    return () => (mounted = false);
  }, []);

  const form = document.forms[0];
  const MyVerticallyCenteredModal = props => {
    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>ข้อมูลการรับประกัน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ชื่อ - นามสกุล: {record.name}</p>
          <p>เบอร์ติดต่อ: {record.tel}</p>
          <p>ที่อยู่: {record.address}</p>
          <p>จำนวนสินค้า: {itemCount} ชุด</p>
          <p>รุ่นสินค้า: {modelID}</p>
          {massSerial ? (
            <>
              <p>รหัสล๊อต: {record.serialID}</p>
            </>
          ) : (
            <p>รหัสสินค้า: {record.serialID}</p>
          )}
          <p>วันที่ซื้อ: {moment(purchaseDate).format('DD/MM/YYYY')}</p>
          <p>ระยะเวลารับประกัน: {warrantyTime} ปี</p>
          <p>
            วันที่สิ้นสุดการรับประกัน:{' '}
            {moment(purchaseDate).add(warrantyTime, 'y').format('DD/MM/YYYY')}
          </p>
          <p>หมายเลขบิล: {record.invoiceID}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={sendData}>
            Save Changes
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
      name: record.name,
      tel: record.tel,
      address: record.address,
      modelID: modelID,
      serialID: record.serialID,
      purchaseDate: moment(purchaseDate).format('DD/MM/YYYY'),
      warrantyTime: warrantyTime,
      expireDate: moment(purchaseDate)
        .add(warrantyTime, 'y')
        .format('DD/MM/YYYY'),
      invoiceID: record.invoiceID,
      itemCount: itemCount,
    };
    if (massSerial) {
      var SerialArray = massSerial.replace(/\n/g, ' ').split(' ');
      Object.assign(data, { SerialArray: SerialArray });
    }
    CustomerDataService.create(data)
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
        alert(resMessage);
      });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <h5 className="my-4">ข้อมูลลูกค้า / Customer Info</h5>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>ชื่อ - นามสกุล</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="ชื่อ"
                  name="name"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={10} className="mb-3">
              <Form.Group id="address">
                <Form.Label>ที่อยู่</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  placeholder="กรอกที่อยู่"
                  style={{ resize: 'none' }}
                  name="address"
                  onChange={handleInputChange}
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
                  name="tel"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="mb-4">ข้อมูลสินค้า / Goods Info</h5>

          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="modelID">
                <Form.Label>จำนวนสินค้า</Form.Label>
                <Form.Control
                  required
                  type="number"
                  defaultValue="1"
                  name="itemCount"
                  onChange={e => setItemCount(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          {itemCount <= 1 ? (
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="modelID">
                  <Form.Label>รุ่นสินค้า</Form.Label>
                  <Form.Select
                    required
                    onChange={e => setModelID(e.target.value)}>
                    <option>Select a ModelID</option>
                    {modelData.map(option => (
                      <option key={option._id} value={option.modelID}>
                        {option.modelID}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="ItemNo">
                  <Form.Label>รหัสสินค้า (Serial No.)</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="รหัสสินค้า"
                    name="serialID"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : (
            <>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group id="modelID">
                    <Form.Label>รุ่นสินค้า</Form.Label>
                    <Form.Select
                      required
                      onChange={e => setModelID(e.target.value)}>
                      <option>Select a ModelID</option>
                      {modelData.map(option => (
                        <option key={option._id} value={option.modelID}>
                          {option.modelID}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="ItemNo">
                    <Form.Label>รหัสล๊อต (Lot No.)</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="รหัสสินค้า"
                      name="serialID"
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group id="ItemNo">
                    <Form.Label>
                      รหัสสินค้าทั้งหมด (Serial No.)
                      <span style={{ color: 'red' }}>*เว้นบรรทัดใหม่</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      as="textarea"
                      rows={3}
                      style={{ resize: 'none' }}
                      onChange={e => setMassSerial(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          <Row className="align-items-center">
            <Col md={3} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>วันที่ซื้อ</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setPurchaseDate}
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
                          purchaseDate
                            ? moment(purchaseDate).format('DD/MM/YYYY')
                            : ''
                        }
                        name="purchaseDate"
                        placeholder="วัน/เดือน/ปี"
                        onFocus={openCalendar}
                        onChange={e => {
                          setPurchaseDate(e.target.value);
                        }}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>ระยะเวลารับประกัน (ปี)</Form.Label>
                <Form.Select
                  required
                  defaultValue="1"
                  onChange={e => setWarrantyTime(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>วันที่สิ้นสุดการรับประกัน</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: '#F5F8FB' }}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    disabled
                    type="text"
                    value={
                      purchaseDate
                        ? moment(purchaseDate)
                            .add(warrantyTime, 'y')
                            .format('DD/MM/YYYY')
                        : ''
                    }
                    placeholder="วัน/เดือน/ปี"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="ItemNo">
                <Form.Label>หมายเลขบิล (Invoice No.)</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="หมายเลขบิล"
                  name="invoiceID"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <div>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ height: 55, width: '100%' }}>
                  Add
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
          }}
        />
      </Card.Body>
    </Card>
  );
};
