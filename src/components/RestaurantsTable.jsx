import React from 'react';
import PropTypes, { func } from 'prop-types';
import { Container, Table } from 'react-bootstrap';
import { Redirect, useNavigate } from 'react-router-dom';

function TableContainer(props) {
  return (
    <Container style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '300px',
    }}
    >
      {props.children}
    </Container>
  );
}

TableContainer.propTypes = {
  children: PropTypes.node,
};

export default function RestaurantTable(props) {
  const navigate = useNavigate();
  if (props.restaurantsData.length === 0) {
    return (
      <TableContainer>
        <p>No data</p>
      </TableContainer>
    );
  }

  const handleOnClick = (restaurant_id) => (
    navigate(`restaurant/${restaurant_id}`)
  );

  return (
    <TableContainer>
      <Table striped bordered hover>
        <thead>
          <tr style={{
            backgroundColor: 'black',
            color: 'white',
            fontFamily: 'futura',
          }}
          >
            <th align="right">ID</th>
            <th align="right">Name</th>
            <th align="right">Restaurant Address</th>
            <th align="right">Opening Hour</th>
            <th align="right">Closing Hour</th>
            <th align="right">Delivery Price</th>
          </tr>
        </thead>
        <tbody>
          {props.restaurantsData.map(({
            address,
            closing,
            delivery_price,
            name,
            opening,
            restaurant_id,
          }) => (
            <tr style={{cursor:"pointer"}} onClick={() => handleOnClick(restaurant_id)} key={restaurant_id}>
              <td>
                {restaurant_id}
              </td>
              <td align="right">{name}</td>
              <td align="right">{address}</td>
              <td align="right">{opening}</td>
              <td align="right">{closing}</td>
              <td align="right">{delivery_price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
RestaurantTable.propTypes = {
  restaurantsData: PropTypes.array,
};
