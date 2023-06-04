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
    <div
      className="bg-stone-950 min-h-screen grid"
      style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
    >
      <Homebar />
      <div className="m-8 min-w-[50%]">
        <div className="p-4 flex flex-col bg-stone-800 items-center justify-center rounded-lg">
          <div className="pb-2 flex items-center w-full gap-6 border-b-2 border-stone-500">
            <div className="bg-blue-400 rounded-full h-14 w-14 text-center">
              P
            </div>
            <div>
              <CreatePost />
            </div>
          </div>
          <div className="w-full flex justify-around items-center pt-2 text-stone-300 font-bold">
            <div className="h-10 text-center flex-1 hover:bg-red-600 hover:rounded-lg">
              Live Video
            </div>
            <div className="h-10 text-center flex-1 hover:bg-lime-600 hover:rounded-lg">
              Upload Photo
            </div>
            <div className="h-10 text-center flex-1 hover:bg-yellow-600 hover:rounded-lg">
              Feeling Activity
            </div>
          </div>
        </div>
        {posts
          ? posts.map((element) => {
              return (
                <div className="flex flex-col mt-5 p-4 bg-stone-800 rounded-lg text-white">
                  {currentUser == element.user.username ? (
                    <div className="border-b-2 border-neutral-700">
                      <Link
                        to={`/profile`}
                        className="pb-2 flex gap-4 items-center"
                      >
                        <div className="h-10 w-10 rounded-full bg-blue-500">
                          P
                        </div>
                        <div className="font-bold">
                          {element.user.username} - {element.user.first_name}{" "}
                          {element.user.last_name}
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link
                        to={`/pages/${element.user._id}`}
                        className="pb-2 flex gap-4 items-center"
                      >
                        <div className="h-10 w-10 rounded-full bg-blue-500">
                          P
                        </div>
                        <div className="font-bold">
                          {element.user.username} - {element.user.first_name}{" "}
                          {element.user.last_name}
                        </div>
                      </Link>
                    </div>
                  )}
                  <div className="py-4 min-h-[5rem] max-w-full">
                    <div className="whitespace-wrap">{element.message}</div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="py-2 border-b-2 border-neutral-700">
                      {element.likes} Likes
                    </div>
                  </div>
                  <div className="w-full flex justify-around items-center pt-2 pb-1 text-stone-300 border-b-2 border-neutral-700">
                    <div className="h-10 text-center flex-1 hover:bg-neutral-600 hover:rounded-lg">
                      Like
                    </div>
                    <div className="h-10 text-center flex-1 hover:bg-neutral-600 hover:rounded-lg">
                      Share
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-500">P</div>
                      <form onSubmit={(e) => handleComment(element._id, e)}>
                        <textarea
                          placeholder="Write a comment"
                          name="message"
                          onChange={(e) => setWriteComment(e.target.value)}
                          className="w-96 h-10 p-2 bg-stone-600 rounded-3xl text-white hover:bg-stone-500"
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
      <Friendbar friends={friends} />
    </div>
  );
};

export default Timeline;
