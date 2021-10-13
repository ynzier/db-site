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
} from '@themesberg/react-bootstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import TicketDataService from '../services/ticket.service';
const App = props => {
  const [record, setRecord] = useState([]);
  const [filterData, setfilterData] = useState();
  const search = value => {
    const filterTable = record.filter(o =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase()),
      ),
    );

    setfilterData(filterTable);
  };

  const openRecord = id => {
    console.log(id);
    props.history.push('/ticket/' + id);
  };

  const refreshList = () => {
    TicketDataService.getAll()
      .then(res => {
        setRecord(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = 'ข้อความทั้งหมด';
    let mounted = true;
    TicketDataService.getAll()
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

  const deleteRecord = id => {
    TicketDataService.remove(id)
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const header = [
    {
      title: 'Ticket ID',
      dataIndex: 'ticketID',
      key: 'ticketID',
      align: 'center',
    },
    {
      title: 'ชื่อผู้ติดต่อ',
      dataIndex: 'name',
      align: 'center',
      width: 300,
    },
    {
      title: 'หัวข้อ',
      dataIndex: 'subject',
      align: 'center',
      width: 300,
    },
    {
      title: 'อีเมลล์',
      dataIndex: 'email',
      align: 'center',
      width: 300,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'key',
      dataIndex: 'key',
      render: (text, record) => {
        const id = record._id;

        return (
          <div>
            <span
              onClick={() => {
                openRecord(id);
              }}>
              <i className="far fa-edit action mr-2"></i>
            </span>
            <span>&nbsp;&nbsp;</span>
            <span
              onClick={() => {
                deleteRecord(id);
              }}>
              <i className="fas fa-trash action"></i>
            </span>
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
          <Table
            dataSource={filterData == null ? record : filterData}
            columns={header}
            rowKey="ticketID"
            pagination={{ pageSize: 20 }}
          />
        </Card.Body>
      </Card>
    </>
  );
};
export default App;
