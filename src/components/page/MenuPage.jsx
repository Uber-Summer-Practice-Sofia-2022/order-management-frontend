import React, { useEffect, useState, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import LoadingContainer from '../common/LoadingContainer';
import MenuItemTable, { getItems } from '../MenuItemTable';
import OrderForm from '../OrderForm';

const menuURL = 'http://127.0.0.1:5000/';

const INITIAL_VALUES = {
  CustomerName: '',
  DeliveryAddress: '',
  PhoneNumber: '',
  Cutlery: false,
  AdditionalInfo: '',
};

function addQuantityToMenuData(menuData) {
  return menuData.map((menuItem) => {
    const menuItemWithQuantity = {
      category: menuItem.category,
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: 0,
    };
    return menuItemWithQuantity;
  });
}

export default function MenuPage() {
  const navigate = useNavigate();
  const { restaurantID } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [dataLoading, setDataLoading] = useState([false]);
  const [dataRequestStatus, setDataRequestStatus] = useState(200);
  const [values, setValues] = useState(INITIAL_VALUES);

  const fetchData = useCallback(async () => {
    setDataLoading(true);
    const itemsDataReceived = await fetch(`${menuURL}/restaurant/${restaurantID}/item`);
    const itemsDataStatus = itemsDataReceived.status;
    const itemsDataJSON = await itemsDataReceived.json();
    setMenuData(addQuantityToMenuData(itemsDataJSON));
    setDataRequestStatus(itemsDataStatus);
    setDataLoading(false);
  }, [restaurantID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
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

  function formatJSONPayload(menuItems, formValues) {
    const formattedMenuItems = menuItems.filter((item) => item.quantity > 0).map((item) => ({
      item_id: item.id,
      quantity: item.quantity,
    }));
    const requestBody = {
      CustomerName: formValues.CustomerName,
      DeliveryAddress: formValues.DeliveryAddress,
      PhoneNumber: formValues.PhoneNumber,
      Cutlery: formValues.Cutlery,
      AdditionalInfo: formValues.AdditionalInfo,
      Items: formattedMenuItems,
    };
    return requestBody;
  }

  const onFormSubmit = async () => {
    setValues(formatJSONPayload(menuData, values));
    const postResponse = await postData(`http://localhost:5000/restaurant/${restaurantID}/order`, JSON.stringify(values));
    navigate("/order/" + postResponse['ID'] + "/status");
  };

  if (dataRequestStatus !== 200) {
    return (<p>Something went wrong with your request.</p>);
  }

  // menuData - should be localMenuData with quantity
  // onItemQuantityChange - function which modifies selectedItems

  const handleQuantityChange = (operation, menuItemID) => {
    const currItem = menuData.find((item) => item.id === menuItemID);
    if (operation === '+') {
      currItem.quantity += 1;
    } else if (operation === '-' && currItem.quantity > 0) {
      currItem.quantity -= 1;
    }

    const index = menuData.indexOf(currItem);
    const newMenuData = [...menuData];
    newMenuData.splice(index, 1, currItem);
    setMenuData(newMenuData);
  };

  return (
    <Container style={{

      paddingBottom: '10px',
      paddingTop: '10px',
    }}
    >
      {dataLoading
        ? (<LoadingContainer />) : (<MenuItemTable onItemQuantityChange={handleQuantityChange} menuData={menuData} />)}
      <OrderForm values={formatJSONPayload(menuData, values)} setValues={setValues} onSubmit={onFormSubmit} />
    </Container>
  );
}
