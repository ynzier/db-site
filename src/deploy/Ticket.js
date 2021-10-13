import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Breadcrumb } from '@themesberg/react-bootstrap';
import { TicketRead } from '../components/TicketRead';
import TicketDataService from '../services/ticket.service';

const App = props => {
  useEffect(() => {
    document.title = 'อ่านข้อความ';
  }, []);

  const [data, setData] = useState();
  const getRecord = id => {
    TicketDataService.get(id)
      .then(response => {
        setData(response.data);
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
  useEffect(() => {
    getRecord(props.match.params.id);
  }, [props.match.params.id]);
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
            <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={9}>
          <TicketRead data={data} />
        </Col>
      </Row>
    </>
  );
};
export default App;
