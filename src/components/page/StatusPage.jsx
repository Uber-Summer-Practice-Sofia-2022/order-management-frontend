import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import LoadingContainer from '../common/LoadingContainer';
import OrderDataTable from '../OrderDataTable';
import CancelModal from '../CancelModal';

const ORDERAPI_URL = 'http://127.0.0.1:5000/';

const disabledCancelButtonStyle = {
  backgroundColor: 'white',
  marginLeft: '44%',
  marginTop: '50px',
  height: '50px',
  width: '150px',
  borderRadius: '5px',
  filter: 'drop-shadow(1px 1px 10px grey)',
};

const enabledCancelButtonStyle = (isHovering) => ({
  backgroundColor: isHovering ? 'white' : 'black',
  color: isHovering ? 'black' : 'white',
  marginLeft: '44%',
  marginTop: '50px',
  height: '50px',
  width: '150px',
  borderRadius: '5px',
  filter: 'drop-shadow(1px 1px 10px grey)',
});

export default function StatusPage() {
  const [orderInfo, setOrderInfo] = useState({});
  const [dataLoading, setDataLoading] = useState([false]);
  const [dataRequestStatus, setDataRequestStatus] = useState(200);
  const [showCancelModal, toggleCancelModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { orderId } = useParams();

  const fetchData = useCallback(async () => {
    setDataLoading(true);
    const orderDataReceived = await fetch(`${ORDERAPI_URL}/order/${orderId}`);
    const orderDataStatus = orderDataReceived.status;
    setDataRequestStatus(orderDataStatus);
    const orderDataJSON = await orderDataReceived.json();
    setOrderInfo(orderDataJSON.Order[0]);
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onModalClose = () => {
    toggleCancelModal(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  if (dataRequestStatus === 404) {
    return (
      <>
        <h1 style={{ textAlign: 'center', marginTop: '20%' }}>Order not found</h1>
        <Link to="/">
          <button
            style={enabledCancelButtonStyle(isHovering)}
            type="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Home
          </button>
        </Link>

      </>
    );
  }

  let disabled = true;
  const onFormSubmit = async () => {
    console.log('ORDER ID ', orderId);
    await putData(`http://localhost:5000/order/${orderId}/status`, JSON.stringify({ status: 'Cancelled' }));
    toggleCancelModal(true);
    document.getElementById('orderStatus').innerHTML = 'Your order was cancelled';
    disabled = true;
    setOrderInfo({
      ...orderInfo,
      Status: 'Cancelled',
    });
    // orderInfo.Status = 'Cancelled';
  };

  if (orderInfo) {
    disabled = orderInfo.Status !== 'Open';
  }

  console.log('Order data ', orderInfo);

  return (
    <>
      <Container style={{
        paddingBottom: '10px',
        paddingTop: '10px',
      }}
      >
        <h1 id="orderStatus">
          Your order was
          {' '}
          {orderInfo.Status === 'Cancelled' ? 'cancelled' : 'successful'}
        </h1>
        <h2>
          Order status:
          {' '}
          <i>{orderInfo.Status}</i>
        </h2>
        <h2>Your order details: </h2>
        {dataLoading
          ? (<LoadingContainer />) : (<OrderDataTable orderData={orderInfo} />)}
        <button
          id="button"
          style={disabled ? disabledCancelButtonStyle : enabledCancelButtonStyle(isHovering)}
          disabled={disabled}
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onFormSubmit}
        >
          Cancel
        </button>
      </Container>
      <CancelModal visible={showCancelModal} onClose={onModalClose} />

    </>
  );
}
