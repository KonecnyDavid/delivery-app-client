import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Menu, Icon } from "semantic-ui-react";
import OrderList from "./order-llist";
import Import from "./import";

const AVAILABLE_VIEWS = {
  home: "view.home",
  import: "view.import"
};

const App = () => {
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState(AVAILABLE_VIEWS.home);

  const handleStateChange = (order, state) => {
    setOrders([
      ...orders.filter(ord => ord !== order),
      { ...order, state: state }
    ]);
  };

  const createRoute = () => {
    return orders.map(order => order.address).join("/");
  };

  const handleViewInNav = () => {
    if (orders.length < 1) return;

    const route = createRoute();
    const win = window.open(
      `https://www.google.com/maps/dir/Bratislavská 1279, 693 01 Hustopeče/${route}`,
      "_blank"
    );
    win.focus();
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("data")) {
      const data = decodeURIComponent(urlParams.get("data"));
      setOrders(JSON.parse(data).map(order => ({ ...order, state: "ROZVOZ" })));
    }
  }, []);

  return (
    <div>
      <Menu>
        <Menu.Item active={true} onClick={() => setView(AVAILABLE_VIEWS.home)}>
          Objednávky
        </Menu.Item>
        <Menu.Item onClick={() => setView(AVAILABLE_VIEWS.import)}>
          Importovat
        </Menu.Item>
        <Menu.Item onClick={handleViewInNav} disabled={orders.length < 1}>
          <Icon name="map" /> Vložit do navigace
        </Menu.Item>
      </Menu>
      <Container id="main-container">
        {view === AVAILABLE_VIEWS.home && (
          <div>
            <OrderList orders={orders} stateChangeHandler={handleStateChange} />
          </div>
        )}
        {view === AVAILABLE_VIEWS.export && (
          <div>
            <Import importHandler={setOrders} />
          </div>
        )}
      </Container>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
