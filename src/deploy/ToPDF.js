import './ToPDF.css';
import { PDFExport } from '@progress/kendo-react-pdf';
import { useHistory } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@themesberg/react-bootstrap';
import CustomerDataService from '../services/customer.service';
const ToPDF = props => {
  useEffect(() => {
    document.title = 'Export PDF';
  }, []);
  let history = useHistory();
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = event => {
    pdfExportComponent.current.save();
  };

  const [data, setData] = useState();
  const getRecord = id => {
    CustomerDataService.get(id)
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
    // eslint-disable-next-line
  }, [props.match.params.id]);

  return (
    <div>
      <div className="box">
        <h4>Export PDF</h4>

        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" onClick={handleExportWithComponent}>
            Export PDF
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              history.push('/dashboard');
            }}>
            Back
          </Button>
        </ButtonGroup>
      </div>
      <div className="wrap-pdf">
        <PDFExport
          ref={pdfExportComponent}
          paperSize="A5"
          landscape={true}
          fileName={data && data.serialID}>
          <div className="size-a5 pdf-page">
            <div className="model-box">
              <p className="model-id"> {data && data.serialID}</p>
            </div>
            <p className="purchase-date">{data && data.purchaseDate}</p>
            <p className="expired-date">{data && data.expireDate}</p>
          </div>
        </PDFExport>
      </div>
    </div>
  );
};

export default ToPDF;
