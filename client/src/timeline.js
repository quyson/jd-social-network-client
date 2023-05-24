import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Timeline = () => {
  const [posts, setPosts] = useState(null);
  const [friends, setFriends] = useState(null);
  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/timeline`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        setPosts(result.data.friendPosts);
      });
  }, []);
  return (
    <div className="bg-stone-900 min-h-screen">
      <div>
        <div>
          <ul>
            <li>Home</li>
            <li>{currentUser}</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Watch</li>
            <li>Marketplace</li>
            <li>Gaming</li>
            <li>Feeds</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Watch</li>
            <li>Marketplace</li>
            <li>Gaming</li>
            <li>Feeds</li>
          </ul>
        </div>
      </div>
      <h1>Timeline</h1>
      {posts
        ? posts.map((element) => {
            return (
              <div>
                {currentUser == element.user.username ? (
                  <Link to={`/profile`}>
                    <div>
                      {element.user.username} - {element.user.first_name}{" "}
                      {element.user.last_name}
                    </div>
                  </Link>
                ) : (
                  <Link to={`/pages/${element.user._id}`}>
                    <div>
                      {element.user.username} - {element.user.first_name}{" "}
                      {element.user.last_name}
                    </div>
                  </Link>
                )}
                <Link></Link>
                <div>{element.message}</div>
                <div>{element.likes} Likes</div>
              </div>
            );
          })
        : null}
      <div>{}</div>
    </div>
  );
};

export default Timeline;
