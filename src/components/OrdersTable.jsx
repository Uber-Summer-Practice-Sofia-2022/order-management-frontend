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

export default function OrdersTable(props) {
  if (props.ordersData.length === 0) {
    return (
      <TableContainer>
        <p>No data</p>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table striped bordered variant='dark'>
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
            <th align="right">Status</th>
            <th align="right">Restaurant Name</th>
            <th align="right">Restaurant Address</th>
          </tr>
        </thead>
        <tbody>
          {props.ordersData.map(({
            OrderID,
            CreatedAt,
            DeliveryAddress,
            TotalPrice,
            DeliveryPrice,
            PhoneNumber,
            CustomerName,
            Status,
            RestaurantName,
            RestaurantAddress,
          }) => (
            <tr key={OrderID}>
              <td>
                {OrderID}
              </td>
              <td align="right">{CreatedAt}</td>
              <td align="right">{DeliveryAddress}</td>
              <td align="right">{TotalPrice}</td>
              <td align="right">{DeliveryPrice}</td>
              <td align="right">{PhoneNumber}</td>
              <td align="right">{CustomerName}</td>
              <td align="right">{Status}</td>
              <td align="right">{RestaurantName}</td>
              <td align="right">{RestaurantAddress}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

OrdersTable.propTypes = {
  ordersData: PropTypes.array,
};
