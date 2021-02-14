import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Meteor } from "meteor/meteor";
import { Route, BrowserRouter as Router, useHistory } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
import OrdersPage from "./pages/OrdersPage";
import GoodsPage from "./pages/GoodsPage";
import ClientOrders from "./ClientOrders";
const SideBar = () => {
  const logout = () => {
    Meteor.logout();
  };
  return (
    <div>
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                onSelect={(selected) => {
                  const to = "/" + selected;
                  if (location.pathname !== to) {
                    history.push(to);
                    if (to === "/logout") {
                      history.push("/");
                    }
                  }
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="">
                  <NavItem eventKey="">
                    <NavIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-collection-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z" />
                      </svg>
                    </NavIcon>
                    <NavText>Goods</NavText>
                  </NavItem>
                  <NavItem eventKey="clients">
                    <NavIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-lines-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                      </svg>
                    </NavIcon>
                    <NavText>Clients</NavText>
                  </NavItem>
                  <NavItem eventKey="orders">
                    <NavIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-cart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                    </NavIcon>
                    <NavText>Orders</NavText>
                  </NavItem>
                  <NavItem
                    onSelect={logout}
                    eventKey="logout"
                    style={{ marginTop: 50 }}
                  >
                    <NavIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-door-closed-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </NavIcon>
                    <NavText>logOut</NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <main>
                <Route path="/" exact component={() => <GoodsPage />} />
                <Route path="/clients" component={() => <ClientsPage />} />
                <Route path="/orders" component={() => <OrdersPage />} />
                <Route path="/clientOrders" component={ClientOrders} />
              </main>
            </React.Fragment>
          )}
        />
      </Router>
    </div>
  );
};
export default SideBar;
