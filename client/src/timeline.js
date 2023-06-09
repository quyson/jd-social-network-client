import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "./createPost";
import Homebar from "./homebar";
import Friendbar from "./friendBar";

const Timeline = () => {
  const [posts, setPosts] = useState(null);
  const [friends, setFriends] = useState([]);
  const [writeComment, setWriteComment] = useState(null);
  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );

  const handleComment = (postId, e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(postId);
    axios
      .post(
        `http://localhost:8000/post/createComment/${postId}`,
        { message: writeComment },
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/timeline`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        setPosts(result.data.friendPosts);
        setFriends(result.data.friends);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-dark border-right border-white">
          <Homebar />
        </div>
        <div className="col-6">
          <div>
            <div>
              <div>P</div>
              <div>
                <CreatePost />
              </div>
            </div>
            <div>
              <div>Live Video</div>
              <div>Upload Photo</div>
              <div>Feeling Activity</div>
            </div>
          </div>
          {posts
            ? posts.map((element) => {
                return (
                  <div>
                    {currentUser == element.user.username ? (
                      <div>
                        <Link to={`/profile`}>
                          <div>P</div>
                          <div>
                            {element.user.username} - {element.user.first_name}{" "}
                            {element.user.last_name}
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <Link to={`/pages/${element.user._id}`}>
                          <div>P</div>
                          <div>
                            {element.user.username} - {element.user.first_name}{" "}
                            {element.user.last_name}
                          </div>
                        </Link>
                      </div>
                    )}
                    <div>
                      <div>{element.message}</div>
                    </div>
                    <div>
                      <div>{element.likes} Likes</div>
                    </div>
                    <div>
                      <div>Like</div>
                      <div>Share</div>
                    </div>
                    <div>
                      <div>
                        <div>P</div>
                        <form onSubmit={(e) => handleComment(element._id, e)}>
                          <textarea
                            placeholder="Write a comment"
                            name="message"
                            onChange={(e) => setWriteComment(e.target.value)}
                          ></textarea>
                          <button>Comment</button>
                        </form>
                      </div>
                      <div></div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="col-3">
          <Friendbar friends={friends} />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
