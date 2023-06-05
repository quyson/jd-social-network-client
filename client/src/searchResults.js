import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Friendbar from "./friendBar";
import Homebar from "./homebar";

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
    <div style={{ gridTemplateColumns: "1fr 2fr 1fr" }}>
      <Homebar />
      <div>
        <h1>Search:</h1>
        {results.length > 0 ? (
          results.map((user) => {
            return currentUser == user.username ? (
              <Link to={`/profile`}>
                <div>{user.username} </div>
              </Link>
            ) : (
              <Link to={`/pages/${user._id}`} key={user._id}>
                <div>{user.username}</div>
              </Link>
            );
          })
        ) : (
          <div>No Results to Show...</div>
        )}
      </div>
      <Friendbar />{" "}
    </div>
  );
};

export default SearchResults;
