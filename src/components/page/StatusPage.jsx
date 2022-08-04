import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LoadingContainer from '../common/LoadingContainer';
import { useParams } from 'react-router-dom';
import OrderDataTable from '../OrderDataTable';

const ORDERAPI_URL = 'http://127.0.0.1:5000/';

export default function StatusPage() {
  const [orderData, setOrderData] = useState([]);
  const [dataLoading, setDataLoading] = useState([false]);
  const [dataRequestStatus, setDataRequestStatus] = useState(200);

  const { orderId } = useParams();

  const fetchData = useCallback(async () => {
    setDataLoading(true);
    const orderDataReceived = await fetch(`${ORDERAPI_URL}/order/${orderId}`);
    const orderDataStatus = orderDataReceived.status;
    const orderDataJSON = await orderDataReceived.json();
    setOrderData(orderDataJSON.Order);
    setDataRequestStatus(orderDataStatus);
    setDataLoading(false);
  }, [orderId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container style={{

      paddingBottom: '10px',
      paddingTop: '10px',
    }}
    >
      <h1>Your order was successful</h1>
      <h2>Your order details: </h2>
      {dataLoading
        ? (<LoadingContainer />) : (<OrderDataTable orderData={orderData} />)}
    </Container>
  );
}
