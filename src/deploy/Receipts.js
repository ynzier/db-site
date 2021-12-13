import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {
  Card,
  Breadcrumb,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Modal,
} from '@themesberg/react-bootstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import NumberFormat from 'react-number-format';

import moment from 'moment-timezone';

import CustomerDataService from '../services/customer.service';
const App = props => {
  const [record, setRecord] = useState([]);
  const [recieveData, setRecieveData] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [total, setTotal] = useState(0);

  const openRecord = id => {
    CustomerDataService.getTransaction(id)
      .then(res => {
        var rec_Data = res.data;
        setRecieveData(rec_Data);
        var sum = res.data.reduce((a, b) => a + b.quantity * b.price, 0);
        setTotal(sum);
        setModalShow(true);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const header2 = [
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'prod_name',
      key: 'prod_id',
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
                dataSource={recieveData}
                columns={header2}
                rowKey="prod_id"
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
            </Card.Footer>
          </Card>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  };
  const checkPayment = id => {
    CustomerDataService.checkPayment(id)
      .then(res => {
        refreshList();
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const refreshList = () => {
    CustomerDataService.getAllReceipts(
      JSON.parse(localStorage.getItem('user')).custNo,
    )
      .then(res => {
        setRecord(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = 'ประวัติการสั่งซื้อสินค้า';
    let mounted = true;
    CustomerDataService.getAllReceipts(
      JSON.parse(localStorage.getItem('user')).custNo,
    )
      .then(res => {
        if (mounted) {
          console.log(res.data);
          setRecord(res.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const header = [
    {
      title: 'รหัสใบสั่งซื้อ',
      dataIndex: 'receipt_id',
      key: 'receipt_id',
      align: 'center',
      sorter: {
        compare: (a, b) => b.receipt_id - a.receipt_id,
      },
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      title: 'ยอดชำระ',
      dataIndex: 'total',
      align: 'center',
      width: 300,
      render: (text, record) => {
        return (
          <p>
            <NumberFormat
              value={text}
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
      title: 'วัน/เดือน/ปี ที่สั่งซื้อ',
      dataIndex: 'rec_date',
      align: 'center',
      width: 300,
      render: (text, record) => {
        return (
          <div>
            <p>{moment(text).format('DD/MM/YYYY HH:mm')}</p>
          </div>
        );
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      align: 'center',
      render: (text, record) => {
        var status = text;
        var message;
        if (status === '0') message = 'รอการชำระเงิน';
        if (status === '1') message = 'กำลังจัดเตรียมสินค้า';
        if (status === '2') message = 'อยู่ระหว่างขนส่ง';
        if (status === '3') message = 'ได้รับสินค้าแล้ว';
        return (
          <div>
            <p>{message}</p>
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'key',
      dataIndex: 'key',
      align: 'center',
      width: 50,
      render: (text, record) => {
        const id = record.receipt_id;

        return (
          <div style={{ paddingBottom: 15 }}>
            <span
              onClick={() => {
                openRecord(record.transaction_id);
              }}>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">ตรวจสอบรายการ</Tooltip>
                }>
                <i className="fa fa-info-circle action mr-2"></i>
              </OverlayTrigger>
            </span>
            <span> </span>
            {record.status > 0 ? (
              ''
            ) : (
              <span
                onClick={() => {
                  checkPayment(id);
                }}>
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">ยืนยันการชำระเงิน!</Tooltip>
                  }>
                  <i class="fa fa-check" aria-hidden="true"></i>
                </OverlayTrigger>
              </span>
            )}
          </div>
        );
      },
    },
  ];
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
          <p>ประวัติการสั่งซื้อสินค้า</p>
        </Card.Header>
        <Card.Body
          className="pt-0"
          style={{ marginTop: 30, height: '100%', width: '100%' }}>
          <Table
            dataSource={record}
            columns={header}
            rowKey="receipt_id"
            pagination={{ pageSize: 20 }}
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
