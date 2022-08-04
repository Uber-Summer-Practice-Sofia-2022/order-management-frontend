import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'react-bootstrap';

function TableContainer(props) {
  return (
    <Container style={{
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

function DisplayData(props) {
  const { info } = props;

  return (
    <tr key={props.trKey}>
      <td>{info.id}</td>
      <td>{info.name}</td>
      <td>{info.category}</td>
      <td>{info.price}</td>
      <td align="center">
        <button type="button" onClick={() => props.onQuantityChange('-', info.id)} style={{ marginLeft: '20px', background: 'black', color: 'white' }}>-</button>
        {/* REPLACE COUNT WITH info.quantity, remove count stuff after */}
        <p style={{ display: 'inline-block', marginLeft: '20px' }}>{info.quantity}</p>
        <button type="button" onClick={() => props.onQuantityChange('+', info.id)} style={{ marginLeft: '20px', background: 'black', color: 'white' }}>+</button>
      </td>
    </tr>
  );
}

export default function MenuItemTable(props) {
  if (props.menuData.length === 0) {
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
            <th align="right">Name</th>
            <th align="right">Category</th>
            <th align="right">Price</th>
            <th style={{ textAlign: 'center' }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {props.menuData.map((menuItem) => (
            <DisplayData
              key={menuItem.id}
              trKey={menuItem.id}
              info={menuItem}
              onQuantityChange={props.onItemQuantityChange}
            />
          ))}
        </tbody>
      </Table>

    </TableContainer>
  );
}

MenuItemTable.propTypes = {
  menuData: PropTypes.array,
  onItemQuantityChange: PropTypes.func,
};

export function getItems(array) {
  array.filter((item) => item.quantity > 0);
  return array;
}
