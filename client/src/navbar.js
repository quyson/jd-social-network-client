import React from "react";
import axios from "axios";
import logout from "./logout";
import { useState } from "react";
import Logout from "./logout";

const Navbar = () => {
  const [search, setSearch] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8000/search",
        { searchQuery: search },
        { headers: { Authorization: token } }
      )
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div>
      <h3>JD SOCIAL NETWORK</h3>
      <div>
        <form onSubmit={handleSearch}>
          <input
            id="search"
            name="search"
            placeholder="Search JD Network"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button>Search</button>
        </form>
      </div>
      <Logout />
    </div>
  );
};

export default Navbar;
