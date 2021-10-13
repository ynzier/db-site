import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Card,
  Breadcrumb,
  InputGroup,
  Button,
  Modal,
} from '@themesberg/react-bootstrap';
import { Table, List, Card as CardAnt } from 'antd';
import 'antd/dist/antd.css';
import NumberFormat from 'react-number-format';
import CartService from '../services/cart.service';
import CustomerDataService from '../services/customer.service';

const App = props => {
  const [modalShow, setModalShow] = useState(false);
  const [record, setRecord] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [transactionData, setTransactionData] = useState([]);
  const postTransaction = async () => {
    var freeTransId;

    await CustomerDataService.getFreeTransID()
      .then(res => {
        freeTransId = res.data.maxItem;
        console.log(freeTransId);
      })
      .catch(e => {
        console.log(e);
      });

    await setTransactionData(
      record.map(item => [
        freeTransId,
        item.cust_no,
        item.prod_id,
        item.quantity,
      ]),
    );

    await CustomerDataService.createTransaction(transactionData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        const resMessage =
          (error.res && error.res.data && error.res.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      });
  };
  const header = [
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'prod_name',
      key: 'ticketID',
      align: 'center',
    },
    {
      title: 'ราคา/ชิ้น',
      dataIndex: 'price',
      align: 'center',
      width: 300,
      render: price => {
        return (
          <p>
            <NumberFormat
              value={price}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              displayType={'text'}
              thousandSeparator={true}
              prefix={'฿'}
            />
          </p>
        );
      },
    },
    {
      title: 'จำนวน',
      dataIndex: 'quantity',
      align: 'center',
      width: 50,
    },
  ];

  const MyVerticallyCenteredModal = props => {
    CustomerDataService.getCustomerDetail(
      JSON.parse(localStorage.getItem('user')).custNo,
    )
      .then(res => {
        setAddress(res.data.shipping_addr);
        var sum = res.data.reduce((a, b) => a + b.quantity * b.price, 0);
        setTotal(sum);
      })
      .catch(e => {
        console.log(e);
      });
    return (
      <Modal {...props} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>ใบสั่งซื้อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header>
              <div className="table-settings mb-4">
                <p>รายการสินค้า</p>
              </div>
            </Card.Header>
            <Card.Body
              className="pt-0"
              style={{ marginTop: 30, height: '100%', width: '100%' }}>
              <Table
                dataSource={record}
                columns={header}
                rowKey="ticketID"
                pagination={false}
              />
            </Card.Body>
            <Card.Footer>
              <InputGroup>
                <div style={{ color: 'red', fontWeight: 'bold' }}>
                  <NumberFormat
                    value={total * 1.07}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    decimalSeparator="."
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'ราคาสุทธิ รวม VAT 7% ฿'}
                  />
                </div>
              </InputGroup>
              <div style={{ width: '50%' }}>
                <p></p>
                <p>ที่อยู่สำหรับจัดส่ง:</p>
                <p>{address}</p>
              </div>
            </Card.Footer>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            style={{ height: 55, width: '100%' }}
            onClick={postTransaction}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const refreshList = () => {
    CartService.getCart(JSON.parse(localStorage.getItem('user')).custNo)
      .then(res => {
        setRecord(res.data);
        var sum = res.data.reduce((a, b) => a + b.quantity * b.price, 0);
        setTotal(sum);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = 'ตะกร้าสินค้า';
    let mounted = true;
    CartService.getCart(JSON.parse(localStorage.getItem('user')).custNo)
      .then(res => {
        if (mounted) {
          setRecord(res.data);
          var sum = res.data.reduce((a, b) => a + b.quantity * b.price, 0);
          setTotal(sum);
        }
      })
      .catch(e => {
        console.log(e);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const deleteRecord = id => {
    CartService.deleteItem(id)
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: 'breadcrumb-dark breadcrumb-transparent' }}>
            <Breadcrumb.Item active>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Card>
        <Card.Header>
          <div className="table-settings mb-4">
            <Row className="justify-content-between align-items-center">
              <Col xs={8} md={6} lg={3} xl={4}>
                <InputGroup>
                  <div style={{ color: 'red', fontWeight: 'bold' }}>
                    <NumberFormat
                      value={total}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator="."
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'ราคาทั้งหมด ไม่รวม VAT 7% ฿'}
                    />
                  </div>
                </InputGroup>
              </Col>
              <Col md={2}>
                <div>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ height: 55, width: '100%' }}
                    onClick={() => setModalShow(true)}>
                    ยืนยันการสั่งซื้อ
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Header>
        <Card.Body
          className="pt-0"
          style={{ marginTop: 30, height: '100%', width: '100%' }}>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={record}
            renderItem={item => (
              <List.Item>
                <CardAnt title={item.prod_name}>
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt=""
                    style={{
                      border: '1px solid #ddd',
                      'border-radius': '4px',
                      padding: '5px',
                      width: '100%',
                    }}
                  />
                  <div
                    style={{
                      'white-space': 'nowrap',
                      overflow: 'hidden',
                      'text-overflow': 'ellipsis',
                    }}>
                    {item.description}
                  </div>
                  <div>จำนวน {item.quantity} ชิ้น</div>
                  <div style={{ color: 'red', fontWeight: 'bold' }}>
                    <NumberFormat
                      value={item.price}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator="."
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'฿'}
                    />
                  </div>
                  <div>
                    <span
                      onClick={() => {
                        deleteRecord(item.prod_id);
                      }}>
                      <i className="fas fa-trash action mr-2"></i>
                    </span>
                  </div>
                </CardAnt>
              </List.Item>
            )}
          />
        </Card.Body>
      </Card>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </>
  );
};
export default App;
