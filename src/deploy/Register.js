import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Breadcrumb } from '@themesberg/react-bootstrap';
import { RegisterForm } from '../components/regisForm';

const App = props => {
  useEffect(() => {
    document.title = 'ลงทะเบียน';
    if (JSON.parse(localStorage.getItem('user'))) props.history.push('/');
  }, [props.history]);
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
            <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Register</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={9}>
          <RegisterForm />
        </Col>
      </Row>
    </>
  );
};
export default App;
