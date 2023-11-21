import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import QrReader from 'qrcode-reader';
import { useDropzone } from 'react-dropzone';


import '../../../assets/qrscanner.css';
import { Link } from 'react-router-dom';

function ScanQr() {
  const [qrCodeData, setQRCodeData] = useState('');
  const [scanError, setScanError] = useState('');

  const handleScan = (data) => {
      if (data) {
          alert(data);
      }
  };

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            const qr = new QrReader();
            qr.callback = (error, result) => {
                if (error) {
                    console.error(error);
                    return;
                }
                setQRCodeData(result.result);
            };
            qr.decode(reader.result);
        };
        reader.readAsDataURL(file);
    });
};

const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleError = (error) => {
      setScanError(error);
      console.error('QR Scan Error:', error);
  };

  return (
      <div>
      <div className='admin-header mb-5'>
          <h1>Scan/Drop QR-Code</h1> 
      </div>

      <div className="qr-scanner-container">
            <div {...getRootProps()} className="qr-scanner-dropzone">
                <input {...getInputProps()} />
                <p>Drag 'n' drop QR code here, or click to select files</p>
            </div>
            {qrCodeData && (
                <div className="qr-scanner-results">
                  <Link className='link' to={qrCodeData}>View Ticket</Link>
                </div>
            )}
        </div>
          <QrScanner
              onScan={handleScan}
              onError={handleError}
              style={{ width: '100%' }}
          />
          {/* {qrCodeData && (
              <div>
                  <strong>Scanned Data:</strong> {qrCodeData}
              </div>
          )} */}
          {scanError && (
              <div className="error">
                  Error: {scanError.message}
              </div>
          )}    
          
      </div>
  );
};

export default ScanQr