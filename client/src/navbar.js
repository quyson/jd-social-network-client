import React from "react";
import { useState, useEffect } from "react";
import Logout from "./logout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Notifications from "./notifications";

const Navbar = (props) => {
  const [search, setSearch] = useState(null);

  const notifications = useSelector(
    (state) => state.notification && state.notification.latestNotifications
  );

  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );

  return (
    <div className="container-fluid sticky-top border-bottom border-white">
      <nav className="row p-3 navbar navbar-light bg-dark">
        <div
          className="col-4 d-flex align-items-center"
          style={{ gap: "1rem" }}
        >
          <div
            className="bg-primary rounded-circle text-light font-weight-bold d-flex justify-content-center align-items-center"
            style={{ height: "3rem", width: "3rem", fontSize: "2rem" }}
          >
            JD
          </div>
          <h5 className="font-weight-bold">
            <Link to={`/timeline`}>JD SOCIAL NETWORK</Link>
          </h5>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          <form className="d-flex">
            <input
              id="search"
              name="search"
              placeholder="Search JD Network"
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
            ></input>
            <Link to={`/search/${search}`}>
              <button type="button" className="btn btn-primary rounded">
                Search
              </button>
            </Link>
          </form>
        </div>
        <div
          className="col-4 d-flex justify-content-center align-items-center"
          style={{ gap: "1rem" }}
        >
          {notifications.length > 0 && notifications ? (
            <div
              data-toggle="modal"
              data-target="#notifModal"
              className="rounded-circle bg-success d-flex justify-content-center align-items-center font-weight-bold"
              style={{ height: "2rem", width: "2rem", color: "white" }}
            >
              {notifications.length}
            </div>
          ) : (
            <div data-toggle="modal" data-target="#notifModal">
              Notifications
            </div>
          )}
          <Link to={`/profile`}>
            <div>{currentUser}</div>
          </Link>
          <Logout />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
