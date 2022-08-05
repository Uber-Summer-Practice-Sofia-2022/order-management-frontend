/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'react-bootstrap';

function TableContainer(props) {
  return (
    <Container style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      {props.children}
    </Container>
  );
}

TableContainer.propTypes = {
  children: PropTypes.node,
};

export default function OrderDataTable(props) {
  const { orderData } = props;

  if (orderData.length === 0) {
    return (
      <TableContainer>
        <p>No data</p>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table striped bordered hover>
        <thead>
          <tr style={{
            backgroundColor: 'black',
            color: 'white',
          }}
          >
            <th align="right">ID</th>
            <th align="right">Created At</th>
            <th align="right">Delivery Address</th>
            <th align="right">Total Price</th>
            <th align="right">Delivery Price</th>
            <th align="right">Phone Number</th>
            <th align="right">Customer Name</th>
            <th align="right">Restaurant Name</th>
            <th align="right">Restaurant Address</th>
          </tr>
        </thead>
        <tbody>
          <tr key={orderData.ID}>
            <td>
              {orderData.ID}
            </td>
            <td align="right">{orderData.CreatedAt}</td>
            <td align="right">{orderData.DeliveryAddress}</td>
            <td align="right">{orderData.TotalPrice}</td>
            <td align="right">{orderData.DeliveryPrice}</td>
            <td align="right">{orderData.PhoneNumber}</td>
            <td align="right">{orderData.CustomerName}</td>
            <td align="right">{orderData.RestaurantName}</td>
            <td align="right">{orderData.RestaurantAddress}</td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
}

OrderDataTable.propTypes = {
  orderData: PropTypes.object,
};
