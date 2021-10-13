import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Form,
  Card,
  Breadcrumb,
  InputGroup,
  Modal,
} from '@themesberg/react-bootstrap';
import { List, Card as CardAnt } from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import ProductService from '../services/product.service';
import CartService from '../services/cart.service';
import NumberFormat from 'react-number-format';

const App = props => {
  const [record, setRecord] = useState([]);
  const [productData, setProductData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [filterData, setfilterData] = useState();
  const [inputCount, setInputCount] = useState(1);
  const search = value => {
    const filterTable = record.filter(o =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase()),
      ),
    );

    setfilterData(filterTable);
  };
  const MyVerticallyCenteredModal = props => {
    return (
      <Modal {...props} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>ข้อมูลสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{productData.prod_name}</p>
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            <NumberFormat
              value={productData.price}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              displayType={'text'}
              thousandSeparator={true}
              prefix={'฿'}
            />
          </p>
          <p>{productData.description}</p>
          <img
            src={`data:image/jpeg;base64,${productData.image}`}
            alt=""
            style={{
              display: 'block',
              'margin-left': 'auto',
              'margin-right': 'auto',
              width: '50%',
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <p>
            จำนวน (ชิ้น)
            <InputGroup>
              <Form.Control
                type="number"
                defaultValue={inputCount}
                onChange={e => setInputCount(e.target.value)}
                max={productData.stock}
              />
            </InputGroup>
          </p>
          <i
            style={{ 'font-size': '4em', color: 'salmon' }}
            className="fas fa-shopping-cart action"
            onClick={() => {
              var data = { quantity: inputCount };
              CartService.addItem(productData.prod_id, data)
                .then(response => {
                  setModalShow(false);
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
            }}></i>
        </Modal.Footer>
      </Modal>
    );
  };
  const fetchProduct = id => {
    ProductService.getOne(id)
      .then(res => {
        setProductData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const openRecord = id => {
    fetchProduct(id);
    MyVerticallyCenteredModal(id);
    setModalShow(true);
  };

  useEffect(() => {
    document.title = 'สินค้าทั้งหมด';
    let mounted = true;
    ProductService.getAll()
      .then(res => {
        if (mounted) {
          setRecord(res.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
    return () => (mounted = false);
  }, []);

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
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    onChange={e => search(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>
        </Card.Header>
        <Card.Body
          className="pt-0"
          style={{ marginTop: 30, height: '100%', width: '100%' }}>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={filterData == null ? record : filterData}
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
                    onClick={() => {
                      openRecord(item.prod_id);
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
                  <div>จำนวนสินค้าคงเหลือ {item.stock} ชิ้น</div>
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
                        openRecord(item.prod_id);
                      }}>
                      <i className="fas fa-info-circle action mr-2"></i>
                    </span>
                    <span>&nbsp;&nbsp;</span>
                    <span onClick={() => {}}>
                      <i className="fas fa-shopping-cart action"></i>
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
