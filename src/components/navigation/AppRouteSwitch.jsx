import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from '../page/HomePage';
import CharacterPage from '../page/CharacterPage';
import PlanetsPage from '../page/PlanetsPage';
import OrdersPage from '../page/OrdersPage';
import MenuPage from '../page/MenuPage';
import OrderStatusPage from '../page/OrderStatusPage';
import StatusPage from '../page/StatusPage';

export default function AppRouteSwitch() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/planets" element={<PlanetsPage />} />
      <Route path="/character" element={<CharacterPage />} />
      <Route path="/admin/orders" element={<OrdersPage />} />
      <Route path="/restaurant/:restaurantID" element={<MenuPage />} />
      <Route path="/order/status" element={<OrderStatusPage />} />
      <Route path="/order/:orderId/status" element={<StatusPage />} />
    </Routes>
  );
}
