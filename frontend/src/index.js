import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.min.css";
import App from "./App";
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  OrderScreen,
  PaymentScreen,
  PlaceOrderScreen,
  ProductScreen,
  ProfileScreen,
  RegisterScreen,
  ShippingScreen,
} from "./screens";
import store from "./store";
import { AdminRoute, PrivateRoute } from "./components";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  OrderListScreen,
  ProductEditScreen,
  ProductListScreen,
  UserListScreen,
} from "./screens/admin";
import UserEditScreen from "./screens/admin/UserEditScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="page/:pageNumber" element={<HomeScreen />} />
      <Route path="product/:id" element={<ProductScreen />} />
      <Route path="cart" element={<CartScreen />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="shipping" element={<ShippingScreen />} />
        <Route path="payment" element={<PaymentScreen />} />
        <Route path="placeorder" element={<PlaceOrderScreen />} />
        <Route path="order/:id" element={<OrderScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="admin/orderlist" element={<OrderListScreen />} />
        <Route path="admin/productlist" element={<ProductListScreen />} />
        <Route path="admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="admin/userlist" element={<UserListScreen />} />
        <Route path="admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
