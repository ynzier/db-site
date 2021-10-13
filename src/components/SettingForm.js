import React, { useState, useEffect } from 'react';
import ProductService from '../services/product.service';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Form, InputGroup, Button } from '@themesberg/react-bootstrap';

export const SettingForm = props => {
  const [modelData, setModelData] = useState(props.data);
  const [input, setInput] = useState();
  useEffect(() => {
    let mounted = true;
    ProductService.getAll()
      .then(res => {
        if (mounted) {
          setModelData(res.data);
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

  const refreshList = () => {
    ProductService.getAll()
      .then(res => {
        setModelData(res.data);
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
  const sendData = () => {
    var data = {
      modelID: input,
    };
    ProductService.add(data)
      .then(response => {
        refreshList();
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
  const deleteRecord = id => {
    ProductService.remove(id)
      .then(response => {
        refreshList();
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

  const header = [
    {
      title: 'รุ่นสินค้า',
      dataIndex: 'modelID',
      key: 'modelID',
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
      <div className="border-bottom border-light d-flex justify-content-between">
        <h5 className="mb-0">เพิ่ม / ลบ รุ่นสินค้า</h5>
        <InputGroup className="mb-md-0" style={{ width: '30%' }}>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faPlus} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="ชื่อรุ่นสินค้า"
            onChange={e => setInput(e.target.value)}
          />
          <Button onClick={sendData}>เพิ่ม</Button>
        </InputGroup>
      </div>
      <Table
        dataSource={modelData ? modelData : null}
        columns={header}
        rowkey="_id"
      />
    </>
  );
};
