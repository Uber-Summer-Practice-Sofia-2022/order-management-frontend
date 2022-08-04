import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import LoadingContainer from '../common/LoadingContainer';
import OrderDataTable from '../OrderDataTable';
import CancelModal from '../CancelModal';

const ORDERAPI_URL = 'http://127.0.0.1:5000/';

export default function StatusPage() {
  const [orderData, setOrderData] = useState([]);
  const [dataLoading, setDataLoading] = useState([false]);
  const [dataRequestStatus, setDataRequestStatus] = useState(200);
  const [showCancelModal, toggleCancelModal] = useState(false);
  const { orderId } = useParams();

  const fetchData = useCallback(async () => {
    setDataLoading(true);
    const orderDataReceived = await fetch(`${ORDERAPI_URL}/order/${orderId}`);
    const orderDataStatus = orderDataReceived.status;
    setDataRequestStatus(orderDataStatus);
    const orderDataJSON = await orderDataReceived.json();
    setOrderData(orderDataJSON.Order);
    setDataLoading(false);
  }, [orderId]);

  async function putData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: data,
    });

    return response.json();
  }

  let postResponse;
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onModalClose = () => {
    toggleCancelModal(false);
  };

  if (dataRequestStatus !== 200) {
    return (
      <>
        <h1 style={{ textAlign: 'center', marginTop: '20%' }}>Something went wrong with your request.</h1>
        <Link to="/">
          <button
            style={{
              backgroundColor: 'white', marginLeft: '44%', marginTop: '50px', height: '50px', width: '150px', borderRadius: '5px', filter: 'drop-shadow(1px 1px 10px grey)',
            }}
            type="button"
          >
            Home
          </button>
        </Link>

      </>
    );
  }

  const order_id = orderId;
  let disabled = true;
  const onFormSubmit = async () => {
    postResponse = await putData(`http://localhost:5000/order/${order_id}/status`, JSON.stringify({ status: 'Cancelled' }));
    toggleCancelModal(true);
    document.getElementById("orderStatus").innerHTML = "Your order was cancelled";
    disabled = true;
    orderData[0].Status = 'Cancelled';
  };

  if (orderData.length > 0) {
    disabled = orderData[0].Status !== 'Open';
  }
  if(disabled)
  {
    return (
      <>
        <Container style={{
          paddingBottom: '10px',
          paddingTop: '10px',
        }}
        >
          <h1 id="orderStatus">Your order was cancelled</h1>
          <h2>Your order details: </h2>
          {dataLoading
            ? (<LoadingContainer />) : (<OrderDataTable orderData={orderData} />)}
          <button
            id="button"
            style={{
              backgroundColor: 'white', marginLeft: '44%', marginTop: '50px', height: '50px', width: '150px', borderRadius: '5px', filter: 'drop-shadow(1px 1px 10px grey)',
            }}
            disabled={disabled}
            type="button"
            onClick={onFormSubmit}
          >
            Cancel
          </button>
        </Container>
        <CancelModal visible={showCancelModal} onClose={onModalClose} />
  
      </>
    );
  }
  else
  {
    return (
      <>
        <Container style={{
          paddingBottom: '10px',
          paddingTop: '10px',
        }}
        >
          <h1 id="orderStatus">Your order was successful</h1>
          <h2>Your order details: </h2>
          {dataLoading
            ? (<LoadingContainer />) : (<OrderDataTable orderData={orderData} />)}
          <button
            id="button"
            style={{
              backgroundColor: 'white', marginLeft: '44%', marginTop: '50px', height: '50px', width: '150px', borderRadius: '5px', filter: 'drop-shadow(1px 1px 10px grey)',
            }}
            disabled={disabled}
            type="button"
            onClick={onFormSubmit}
          >
            Cancel
          </button>
        </Container>
        <CancelModal visible={showCancelModal} onClose={onModalClose} />
  
      </>
    );
  }
}
