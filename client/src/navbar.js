import React from "react";
import { useState, useEffect } from "react";
import Logout from "./logout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Notifications from "./notifications";
require("bootstrap");

const Navbar = () => {
  const [search, setSearch] = useState(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );

  return (
    <nav className="container-fluid navbar fixed-top bg-dark">
      <div className="row">
        <h1 className="col">
          <Link to={`/timeline`}>JD SOCIAL NETWORK</Link>
        </h1>
        <div>
          <form>
            <input
              id="search"
              name="search"
              placeholder="Search JD Network"
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <Link to={`/search/${search}`}>
              <button type="button">Search</button>
            </Link>
          </form>
        </div>
        <div>
          <Notifications />
          <Link to={`/profile`}>
            <div>{currentUser}</div>
          </Link>
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
