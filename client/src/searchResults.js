import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Friendbar from "./friendBar";
import Homebar from "./homebar";
import "./styles.css";

const SearchResults = () => {
  const searchQuery = useParams();
  const [results, setResults] = useState([]);
  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/search/${searchQuery.id}`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        setResults(result.data.result);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-dark border-right border-white">
          <Homebar />
        </div>
        <div className="col bg-dark" style={{ color: "white" }}>
          <h1 className="font-weight-bold pt-3 border-bottom border-white">
            Search:
          </h1>
          {results.length > 0 ? (
            results.map((user) => {
              return currentUser == user.username ? (
                <Link to={`/profile`}>
                  <div
                    className="card bg-secondary mb-1"
                    style={{ color: "black" }}
                  >
                    <div className="card-body search-card">
                      <h4 className="card-title font-weight-bold">{`${user.username}`}</h4>
                      <div className="card-text">{`Name: ${user.first_name} ${user.last_name}`}</div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to={`/pages/${user._id}`} key={user._id}>
                  <div
                    className="card bg-secondary mb-1"
                    style={{ color: "black" }}
                  >
                    <div className="card-body search-card">
                      <h4 className="card-title font-weight-bold">{`${user.username}`}</h4>
                      <div className="card-text">{`Name: ${user.first_name} ${user.last_name}`}</div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div>No Results to Show...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
